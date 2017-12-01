

const yt = require('ytdl-core');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}
let filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    let exp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
    let regex = new RegExp(exp);
    links = data.match(regex);
    links.forEach(link => {

        console.log("Link: " + link);
        yt.getInfo(yt.getURLVideoID(link), (err, info) => {
            if (err) throw err;
            var audioFormats = yt.filterFormats(info.formats, 'audioonly');
            for (let frmt in audioFormats){
            console.log(`audio formats on ${info.title} ` + frmt);
            }

        });

    });
});
