# Interfaces

1. In TS Interfaces can be seen as more powerful types

2. They are the preferred when dealing with more complex data structures

3. The are a structural contract.

4. Can be combined with classes, which feels more like a Java Interface (See OOP with TS file)

## Contents

<!-- toc -->

- [Difference with languages like Java (Detour)](#difference-with-languages-like-java-detour)
- [Using Type](#using-type)
- [Converting to an Interface](#converting-to-an-interface)
  * [Combining Interfaces (side note)](#combining-interfaces-side-note)
- [Interfaces with Function Types](#interfaces-with-function-types)
- [Extending Interfaces](#extending-interfaces)
- [Interface and Optional Properties](#interface-and-optional-properties)
- [Interface with Index Signature (Need to understand this better)](#interface-with-index-signature-need-to-understand-this-better)
  * [Way 1 => [key:number]: string](#way-1--keynumber-string)
  * [Way 2 => [key:string]:any](#way-2--keystringany)
  * [Nested Index Signature](#nested-index-signature)

<!-- tocstop -->

## Difference with languages like Java (Detour)

1. In Java Interfaces are Classes with only method declarations ie. methods are not actually defined unlinke in TS.

2. Interfaces in Java are used to build loosely coupled extensible, testable applications

3. `Class A---> Interface X <----Calss B`. Both A and B are implementation of `X`. This makes them loosely coupled classes aloowing us to make changes to B without affecting A

## Using Type

```ts
// Using Type instead of Interface
type Pizza = {
  name: string;
  sizes: string[]; // array of strings
};

// creates an pizza object
function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
  };
}

let pizza: Pizza;
pizza = createPizza("All Dressed", ["small", "medium", "large"]);
```

## Converting to an Interface

```ts
// Using Type instead of Interface

interface Pizza {
  name: string;
  sizes: string[]; // array of strings
}

// Way 1 (a cleaner way)
function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
  };
}

// Way 2 (alternate way)
function createPizza(name: string, sizes: string[]) {
  return {
    name,
    sizes,
  } as Pizza;
}

let pizza: Pizza;
pizza = createPizza("All Dressed", ["small", "medium", "large"]);
```

### Combining Interfaces (side note)

```ts
//Combining Interface
interface Pizzas {
  data: Pizza[];
}
```

## Interfaces with Function Types

In this section we see how we will define functions with return types within the Interface itself

1. In the example `createPizza()` is our function with return type `Pizza`

2. There are 2 ways to define the return type, see above

3. Finally, if we want we can omit the return type altogether but that nullifies typescripts ability to infer the return type of our function. So not recommended.

4. When it comes to describing `getters and setters` in an interface, the syntax is slightly different from a regular function (see OOP with TS file)

```ts
interface Pizza {
  name: string;
  sizes: string[]; // array of strings
  getAvailableSizes(): string[];
}

function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
    getAvailableSizes() {
      return this.sizes;
    },
  };
}

let pizza: Pizza;
pizza = createPizza("All Dressed", ["small", "medium", "large"]);

const sizes = pizza.getAvailableSizes();
console.log(sizes); //[ 'small', 'medium', 'large' ]
```

## Extending Interfaces

Pretty much like CLass Inheritance

```ts
interface Sizes {
  sizes: string[];
}

// we no longer need to define sizes here
interface Pizza extends Sizes {
  name: string;
  getAvailableSizes(): string[];
}

//everything here is the same
function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
    getAvailableSizes() {
      return this.sizes;
    },
  };
}
```

## Interface and Optional Properties

```ts
interface Pizza extends Sizes {
  name: string;
  toppings?: number; //optional property
  getAvailableSizes(): string[];
}

// ...other code
let pizza: Pizza;
pizza = createPizza("All Dressed", ["small", "medium", "large"]);

//adding optional property later
pizza.toppings = 5;
```

## Interface with Index Signature (Need to understand this better)

Quite common to treat a data structure like a dictionary, so there is some kind of property that will help us retrieve it.

Lets say each pizza gets an uinqiue id, so in an array of pizzas it will be easy to find

1. TypeScript allows us to use something called Index Signature

2. Index Signature is also what helps us create dynamic propeties for our object

NTS: (need to understand this better)

### Way 1 => [key:number]: string

```ts
interface Pizza extends Sizes {
  name: string;
  toppings?: number;
  [key: number]: string; // Index Signature
  getAvailableSizes(): string[];
}

// ..code for creating pizza, adding toppings as above

// Index Signature
// Can create one or many Dynamic properties
// But the key is till actually a string as seen in the output
pizza[1] = "xyz";
pizza[2] = "abc";

console.log(pizza);
```

```bash
// Output from console log
// Note that the key '1' is actually a string
{
  '1': 'xyz',
  '2': 'abc',
  name: 'All Dressed',
  sizes: [ 'small', 'medium', 'large' ],
  getAvailableSizes: [Function: getAvailableSizes],
  toppings: 5
}
```

### Way 2 => [key:string]:any

1. Gives us more flexibility

2. Less specific

3. If we want we can use both together (Way 1 and Way 2)

```ts
interface Pizza extends Sizes {
  name: string;
  toppings?: number;
  [key: string]: any; // Index Signature
  getAvailableSizes(): string[];
}

// ..code for creating pizza, adding toppings as above

// Index Signature
// Can use both a number or a string as key
// but regardless both keys will actually be string
pizza[1] = "xyz";
pizza["abc"] = "xyz";

console.log(pizza);
```

```bash
{
  '1': 'xyz', # Index Signature
  name: 'All Dressed',
  sizes: [ 'small', 'medium', 'large' ],
  getAvailableSizes: [Function: getAvailableSizes],
  toppings: 5,
  abc: 'xyz' # Index Signature
}
```

### Nested Index Signature

1. Finally Index Signatures can be nested

2. Made dictionary property optional otherwise `createPizza()` function needs to change to avoid errors

```ts
interface Pizza extends Sizes {
  name: string;
  toppings?: number;
  [key: number]: string; // Index Signature
  [key: string]: any; // Index Signature
  dictionary?: {
    [key: string]: any; // Nested Index Signature
  };
  getAvailableSizes(): string[];
}
```
