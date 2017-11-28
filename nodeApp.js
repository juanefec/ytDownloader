const fs = require('fs');
const yt = require('ytdl-core');
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
let links = [];
let filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  console.log( filename + "  Loaded.");  
  let exp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
  let regex = new RegExp(exp);
  links = data.match(regex);
  links.forEach( link => { 
    console.log("link: " + link);
    yt.getInfo( yt.getURLVideoID(link) , (err, info) => {
      if (err) throw err;      
      console.log("Downloading... :" + info.title);      
      yt( link, { filter: "audioonly" }).pipe(fs.createWriteStream(`music/${info.title}.mp3`));
    });
  });
});