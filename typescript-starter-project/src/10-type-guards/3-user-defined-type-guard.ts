export class Song {
  constructor(public title: string, public duration: number) {}
}

export class Playlist {
  constructor(public name: string, public songs: Song[]) {}
}

function isSong(item: any): item is Song {
  return item instanceof Song;
}

function getItemName(item: Song | Playlist) {
  if (isSong(item)) {
    return item.title;
  }
  return item.name;
}
