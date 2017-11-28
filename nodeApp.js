var fs = require('fs');
var yt = require('ytdl-core');
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
let links = [];
var filename = process.argv[2];
fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  console.log( filename + "  Loaded.");  
  var exp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm;
  var regex = new RegExp(exp);
  links = data.match(regex);
  links.forEach( link => {    
    yt.getInfo( yt.getURLVideoID(link) , function (err, info) {
      if (err) throw err;
      console.log('title: ' + info.title);
      console.log("Descargando...");
      yt( link, { filter: "audioonly" }).pipe(fs.createWriteStream(`music/${info.title}.mp3`));
    });
  });
});
