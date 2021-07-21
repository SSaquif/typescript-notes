class Song {
  constructor(public title: string, public duration: number) {}
}

class Playlist {
  constructor(public name: string, public songs: Song[]) {}
}

function getItemName(item: Song | Playlist) {
  if (item instanceof Song) {
    return item.title;
  }
  return item.name;
}

function getItemName2(item: Song | Playlist) {
  if ((item as Song).title) {
    return (item as Song).title;
  }
  return (item as Playlist).name;
}

const song = new Song("La dida da", 30000);
const playlist = new Playlist("Awesome Songs", [song]);

const songName1 = getItemName(song);
const playlistName1 = getItemName(playlist);
const songName2 = getItemName2(song);
const playlistName2 = getItemName2(playlist);

console.log(songName1);
console.log(songName2);
console.log(playlistName1);
console.log(playlistName2);
