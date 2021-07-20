let dictionary: { [key: string]: any } = {};

// can think of this as some kind of data stucture
// similar to a linked list
// current = address/hash some refrence to current item
// next = address/hash some refrence to next item
export interface TrackStates {
  current: string;
  next: string;
}

const item1: TrackStates = {
  current: "js02js9",
  next: "jdska29w",
};

const item2: TrackStates = {
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
