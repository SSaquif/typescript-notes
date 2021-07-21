export class Song {
  kind = "song"; // Literal Type
  constructor(public title: string, public duration: number) {}
}

export class Playlist {
  kind = "playlist"; // Literal Type
  constructor(public name: string, public songs: Song[]) {}
}

// returns boolean by checking if property exits or not
function isSong(item: any): item is Song {
  return "title" in item;
}

// This did not work for me
// function getItemName(item: Song | Playlist) {
//   if (item.kind === "song") {
//     return item.title;
//   }
//   return item.name;
// }
