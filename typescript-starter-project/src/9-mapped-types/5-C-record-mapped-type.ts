// Impplementation has changed slightly
// string changed with any,
// ctrl+click Record to see
// type Record<K extends keyof string, T> = {
//     [P in K]: T;
//   };

let dictionary: Record<string, typeof item1> = {};

// Less Dynamic
const item1: Record<"current" | "next", string> = {
  current: "js02js9",
  next: "jdska29w",
};

dictionary[0] = item1;

console.log(dictionary);
// {
//     '0': { current: 'js02js9', next: 'jdska29w' },
//     a: { current: 'jdska29w', next: 'kdlsa23i' }
// }
