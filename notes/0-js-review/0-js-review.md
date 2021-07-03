# Basic JS Review

Putting all my JS notes here for now, will clean up later. Will likely break this into multiple files.

The OOP cards are a mess, should probably update all that when I get time

## Objects & Functions Basics

1. In JS Functions are objects

```js
// Note: Incomplete Code
// 1st arg = function params
// 2nd args = function definition goes there
const circle = new Function("radius", "...");
```

## Enumerating Object Properties

Card 25

1. For in loop

2. For of loop

3. Object.keys() and Object.entries()

4. The in keyword used in conditionals to to check if key exists

## Defining Functions

### Function Declaration vs Function Expression vs Arrow Functions

1. Function Declaration are hoisted

2. Hoisting is the process by with `Function Declarations` are moved to the top at runtime

3. Function Expressions are NOT hoisted

4. Arrow Functions are NOT hoisted either

5. Avoid Hoisting, results in bugs more often

```js
// 1. Function Declaration
// hoisting is supported for fd
// hoisting is the process by which function DECLARATIONS
// are moved to the top at runtime
talk(); //hoisting
function talk() {
  console.log("hello world");
}

// 2. Function Expression (No hoisting)
// A. Named Function Expression
const bark = function bark() {
  console.log("woof woof");
};
bark(); //no hoisting

// B. Anonymous function Expression
const meow = function () {
  console.log("meow");
};
meow(); //not hoisted

// Arrow functions
// arrow functions are not hoisted as well
const moo = () => {
  console.log("moo");
};
moo(); //Not hoisted
```

## Creating Objects

1. Object Literal

2. Factory Functions

3. Constructor Functions

4. Classes (Details for this should be in OOP section)

### Object Literal

1. Creating `Single` Object

```js
// Object Literal
const animal = {
  species: "dog",
  name: "Tesla",
  sound: function () {
    console.log("woof");
  },
};

animal.sound(); //woof
```

### Factory Function

1. Basically a function that `returns` an object

2. We dont use the `this` keyword when assigning property values from argument, like we would do in a constructor function

3. Otherwise can use the `this` keyword as usual, as seen the `sound()` function

```js
function createAnimal(species, name) {
  return {
    species: species, //no this
    name: name, //no this
    sound: function () {
      // can use this inside function as usual
      if (this.species === "dog") {
        console.log("woof woof woof");
      } else {
        console.log("meow");
      }
    },
  };
}

const dog1 = createAnimal("dog", "Mobius");
console.log(dog1.species); //dog
dog1.sound(); // woof woof woof
```

### Constructor Function

1. Very Similar to Classes (Just use classes instead)

```js
// 3. Constructor Functions
// convention to use PascalNotation like in classes
function Animal(species, name) {
  this.species = species;
  this.name = name;
  this.sound = function () {
    if (this.species === "dog") {
      console.log("woof woof woof");
    } else {
      console.log("meow meow meow");
    }
  };
}

// use of new keyword, like in a Class
const cat1 = new Animal("cat", "Gaya");
console.log(cat1.name);
cat1.sound();
```

## Callback Function (Should be it's own section/file with CPS stuff)

1. Good place to add cps stuff (continous passing style)

## Extras

### Constructor Property (Advanced)

1. Maybe overkill (watch vid)

2. The constructor property (when you console.log) basically tells you what object constructor was used to create the object

### Arguments Keyword (Intermediate)

1. Every JS function has an Object (not array) called the arguments object. That holds all the arguments passed into the function by the user

```js
// see that the function declaration itself has no params
function sum() {
  let total = 0;
  console.log(arguments); //checking arguments

  for (let value of arguments) {
    console.log(value);
    total += value;
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));
```

### Getters and Setters (get and set Keywords)

Card 34, 35

### Break and Continue Keywords

### This Keyword

Card 36 37
