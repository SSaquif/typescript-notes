// Basic

// String Array
let sizes: string[];

sizes = ["small", "medium", "large"];

// Number Array
let values: number[];

values = [1, 2, 3];

// Generic Types
// When you deal with something like, a Promise or an Array
// or other built-in or 3rd party APIs/library
// that supplies it's own types
// We might then be dealing with Generic Type

// We are basically using the Array constructor (ie new Array())
// So the Array is a built in generic type
// And it requires 1 type of argument (ie string) (()u can see the errr if you reemove string)
let toppings: Array<string>;

toppings = ["pepperoni", "tomato", "pineapple", "ham"];

// Tuple Types
// A tuple types allows us to suggest to TS that
// we have some kind of data structure, inside of an array
// which is made up of different types
// Common when dealing with 3rd party APIs/libraries like Google Maps
// Basically each array reprsents, one data point and each individual element being some property
// Only want to use this when we know exactly what the data structures look like

// the properties are name , price, vegan
let menuItem: [string, number, boolean];
menuItem = ["pizza", 20, false];
