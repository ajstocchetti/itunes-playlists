var fs = require("fs"),
    itunes = require("itunes-data"),
    parser = itunes.parser(),
    stream = fs.createReadStream("/Users/ajs/Music/iTunes/iTunes Music Library.xml");

const songs = {};

parser.on("track", function(track) {
    // console.log("track:", track);
    songs[track['Track ID']] = track;
});
//
// parser.on("album", function(album) {
//     console.log("album:", album);
// });
parser.on('playlist', function(pl) {
  if (pl.hasOwnProperty('Smart Info')) {
    // console.log('skipping smart playlist', pl.Name);
    return;
  }
  if (pl.Name === 'Library' || pl.Name === 'Podcasts') return;

  console.log(pl.Name);
  pl['Playlist Items']
  .map(i => i['Track ID'])
  .map(id => songs[id])
  .forEach(track => {
    console.log('  -', track.Name, '|', track.Artist);
  })
});


stream.pipe(parser);
