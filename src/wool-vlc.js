const Wool = require('wool');
const net = require('net');
const fs = require('fs');
const osTmpdir = require('os-tmpdir');
const path = require('path');
const mkdirp = require('mkdirp');
const del = require('del');
const vlc = require('vlc')([]);
const once = require('./lib/once');
const packageConfig = require('../package.json');

module.exports = class WoolVLC extends Wool {
    constructor() {
        super();

        this.port = 6024;
        this.module = {
            name: packageConfig.name,
            traits: [
                'stream:video;receiver',
            ],
        };

        this.server = net.createServer(this.onConnection.bind(this));

        process.on('exit', this.onExit.bind(this));
    }

    listen() {
        this.server.listen(this.port);
    }

    onExit() {
        const tmpPath = path.join(osTmpdir(), this.module.name);
        del.sync([tmpPath], { force: true });
    }

    onConnection(socket) {
        this.onVideoStream(socket);
    }

    onVideoStream(socket) {
        this.openTempFileStream()
        .then((tempFile) => {
            socket.on('data', once(() => {
                this.emit('video:pipe', tempFile);

                const media = vlc.mediaFromFile(tempFile.path);
                const player = vlc.mediaplayer;

                player.media = media;
                player.play();
            }));

            socket.pipe(tempFile.writeStream);
        })
        .catch((err) => {
            throw Error(err);
        });
    }

    openTempFileStream() {
        const tmpDirPath = path.join(osTmpdir(), this.module.name);

        return new Promise((resolve, reject) => {
            mkdirp(tmpDirPath, (err) => {
                if (err) {
                    return reject(err);
                }

                const tmpPath = path.join(tmpDirPath, `${Date.now()}${Math.random()}`);

                return resolve({
                    path: tmpPath,
                    writeStream: fs.createWriteStream(tmpPath),
                });
            });
        });
    }
};
