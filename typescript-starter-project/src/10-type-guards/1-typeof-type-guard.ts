// export function foo(bar: string | number) {
//   if (typeof bar === "string") {
//     // TS knows here bar will be a string
//     // bar.toExponential(); //error
//     return bar.toUpperCase();
//   }
//   // TS knows here bar will be a number
//   bar.toExponential();
// }

export class Song {
  public title: string;
  public duration: string | number;

  constructor(title: string, duration: string | number) {
    this.title = title;
    this.duration = duration;
  }
}

function getSongDuration(item: Song) {
  if (typeof item.duration === "string") {
    return item.duration;
  }

  // here we can use methods that work on number
  const { duration } = item;
  const minutes = Math.floor(duration / 60000);
  const seconds = (duration / 1000) % 60;

  return `${minutes}:${seconds}`;
}

const songDurationFromString = getSongDuration(new Song("Haha", "2:30"));
console.log(songDurationFromString);

const songDurationFromMS = getSongDuration(new Song("Haha", 150000));
console.log(songDurationFromMS);
