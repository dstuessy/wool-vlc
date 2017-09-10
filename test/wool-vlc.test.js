const net = require('net');
const fs = require('fs');
const WoolVLC = require('../src/wool-vlc');

describe('wool-vlc', () => {
    const woolvlc = new WoolVLC();
    const port = 8080;

    before(() => {
        woolvlc.port = port;
        woolvlc.start();
        woolvlc.listen();
    });

    it('writes video from data stream into tmp file', (done) => {
        const client = net.connect(port, () => {
            const testPath = './test/assets/test.avi';
            const testFile = fs.createReadStream(testPath);

            woolvlc.on('video:pipe', () => {
                done();
            });

            testFile.pipe(client);
        });
    });

    it('pauses video with remote command');
    it('plays video with remote command');
    it('lowers volume with remote command');
    it('increases volume with remote command');
    it('mutes volume with remote command');
});
