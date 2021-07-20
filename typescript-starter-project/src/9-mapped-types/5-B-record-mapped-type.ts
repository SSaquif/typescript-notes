// Impplementation has changed slightly
// string changed with any,
// ctrl+click Record to see
// type Record<K extends keyof string, T> = {
//     [P in K]: T;
//   };

let dictionary: Record<string, TrackStates> = {};

export interface TrackStates {
  current: string;
  next: string;
}

// Less Dynamic
const item1: Record<"current" | "next", string> = {
  current: "js02js9",
  next: "jdska29w",
};

// More Dynamic
const item2: Record<keyof TrackStates, string> = {
  current: "jdska29w",
  next: "kdlsa23i",
};

dictionary[0] = item1;
dictionary["a"] = item2;

console.log(dictionary);
// {
//     '0': { current: 'js02js9', next: 'jdska29w' },
//     a: { current: 'jdska29w', next: 'kdlsa23i' }
// }
