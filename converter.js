const audioC = require('audio-converter');

audioConverter("./music/Bring Me The Horizon - Can You Feel My Heart Lyrics [HQ]", "./converted/asdasd", {
    progressBar: true
}).then(function() {
    console.log("Done!");
});