# TypeScript Types

For now I will mostly just dump the code from the file, will make it nicer later if needed

## Contents

<!-- toc -->

- [Implicit vs Explicit Types](#implicit-vs-explicit-types)
- [Any, Void, Never Types](#any-void-never-types)
- [Null, Undefined, Strict Null Checks and Multiple Types (Union)](#null-undefined-strict-null-checks-and-multiple-types-union)
- [More about Union and Literal Types](#more-about-union-and-literal-types)
- [Function types](#function-types)
- [Functions and Optional Arguments](#functions-and-optional-arguments)
- [Typed Functions & Default Params](#typed-functions--default-params)
- [Object Types](#object-types)
- [Array Types and Intro to Generics](#array-types-and-intro-to-generics)
- [Tuple Types for Arrays](#tuple-types-for-arrays)

<!-- tocstop -->

## Implicit vs Explicit Types

```typescript
//1. Implicit vs Explicit Type
// If a type is not explicitly defined, then typescript will `infer` a type for the variable

let implicitCoupon = "pizz25"; // Implicit Type
let explicitType: string = "pizza25"; // Explicit Type
```

## Any, Void, Never Types

```typescript
// 1. ANY type (try and avoid using it)
// See that any types can reassigned values of other types

let coupon1; // hover and see, by default coupon is of type any

coupon1 = 25;

coupon1 = "pizza25";

coupon1 = true;

// 2. Void Type (ie no type at all, like in other languages ex void keyword in Java)
let selectedTopping: string = "pepperoni";

// hover over the function and see that the return type is void
// if there is no return, the void type is implied, here I have explicitly defined it
function selectTopping(topping: string): void {
  selectedTopping = topping;
}

// 3. Never Types (Basically tells the tsc that the value will never occur)
// Usually used for errors
// In cases as below better to have never type over any type
function orderError(error: string): never {
  throw new Error(error);
}
orderError("Something went wrong");
```

## Null, Undefined, Strict Null Checks and Multiple Types (Union)

`Note:` This section is not in the ts file.

When dealing with null or undefined values, there are certain things we can opt in/out of depending on our tsc config.

1. In our tsconfig.json file if we set the `strict property to false`

2. And also don't have the following property `strictNullChecK: true` (having `strict:true` by default implies this)

When strict null checks are turned off, we are able to do the following (reassign values to null or undefined):

```typescript
let coupon = "pizza25";

function removeCoupon(): void {
  coupon = null; //or undefined
}

console.log(coupon); // prints pizza25

removeCoupon();

console.log(coupon); // prints null
```

`BUT` we usually do not want this and should not do this.

1. Rather keep the checks on and do this instead

2. Use Union Types

```typescript
// Union types
let coupon: string | null = "pizza25";

function removeCoupon(): void {
  coupon = null; //or undefined
}

console.log(coupon); // prints pizza25

removeCoupon();

console.log(coupon); // prints null
```

## More about Union and Literal Types

1. Union types offers us flexibility

2. They can be values

```typescript
// Union Types

let pizzaSize: string = "small";

// union types can be values (literal value). Can be strings, number, boolean etc
function selectSize(size: "small" | "medium" | "large"): void {
  pizzaSize = size;
}

console.log(pizzaSize); //small

selectSize("medium");

console.log(pizzaSize); //medium
```

## Function types

1. In JS we have function type. Functions are of this type. We can similarly use that `Function` type in TS

```ts
// Function Type

// Way 1 //
// This is more useful when we dont know hat the signature of the function might be
// Better than using any
// Create a variable and assign it's type to be function
let sumOrder: Function;

// Define the function and details later when you create the arrow function
sumOrder = (price: number, quantity: number) => price * quantity;

const sum1 = sumOrder(25, 2);
console.log(sum1); //50

// Way 2 //
// Create a variable BUT also define it's signature right away
// Gives us a nice descriptor
// Advantage: we can export/import this type definition in our program
let sumOrderVerbose: (price: number, quantity: number) => number;

// Now when you declare the function, it's cleaner
// You can rename the params but could have also kept them as quantity and price
sumOrderVerbose = (x, y) => x * y;

const sum2 = sumOrderVerbose(25, 2);
console.log(sum2); //50

// Way 3 //
// I prefer not to do this more confusing than needed
let sumOrder: (price: number, quantity: number) => number = (x, y) => x * y;
// rather do thiss
let sumOrder = (price: number, quantity: number): number => price * quantity;
```

## Functions and Optional Arguments

We use `?:` operator on the argument in the Function Signature

```ts
// Option Params
// We use the ?: operator in our function signature
let sumOrder5: (prce: number, quantity?: number) => number;

sumOrder5 = (x, y) => {
  if (y) {
    return x * y;
  }
  return x;
};

console.log("with optional params", sumOrder5(100)); //100;
```

## Typed Functions & Default Params

1. Pretty straight forward, basically what you would with regular js

2. The function signature doesn't change, but CAN'T remove the `?:` operator in function signature

```ts
let sumOrder6: (prce: number, quantity?: number) => number;

sumOrder6 = (x, y = 1) => x * y;

console.log("with default params", sumOrder6(100)); //100;
console.log("with default params", sumOrder6(100, 2)); //200;
```

## Object Types

```ts
// Way 1
// Predefined Object Signature
let pizza: {
  name: string;
  price: number;
  getName(): string;
};

// Assigning a value later
pizza = {
  name: "Pepperoni",
  price: 25,
  getName() {
    return this.name;
  },
};

console.log(pizza.getName());

//Way 2
// Object Signature and value assignment all at once
let pizza2: { name: string; price: number; getName(): string } = {
  name: "Pinapple and Ham",
  price: 25,
  getName() {
    return this.name;
  },
};

console.log(pizza2.getName());
```

## Array Types and Intro to Generics

```ts
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
```

## Tuple Types for Arrays

```ts
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
```
