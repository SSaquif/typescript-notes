# OOP with TS

When going through this section, the js-review and oop review notes can be helpful

In JS and TS Classes are `syntactical sugar` for creating our own `constructor functions` (see review notes for detailed example) and `prototypal inheritance`

## Contents

<!-- toc -->

- [Using Constructor Functions and Prototype](#using-constructor-functions-and-prototype)
  * [Old way](#old-way)
  * [Better Appraoch with classes](#better-appraoch-with-classes)
- [Private and Public member](#private-and-public-member)
- [Readonly Members](#readonly-members)
- [Getters & Setters(Accessors)](#getters--settersaccessors)
- [Classes & Inheritance](#classes--inheritance)
- [Abstract Classes](#abstract-classes)
- [Protected vs Private Members and Inheritance](#protected-vs-private-members-and-inheritance)
- [Interfaces and Classes](#interfaces-and-classes)
- [Static Properties & Methods](#static-properties--methods)

<!-- tocstop -->

## Using Constructor Functions and Prototype

Right of the bat there is a ts specific few issue using this old approach. If we are in `strict` mode, which we should be in most cases if not all, using the `this` keyword will throw an error. Because the 'this' object will by default be assigned any type and strict mode does not allow any implicit any types. We could set `strict` or the `noImplicitAny` property in the `tsconfig` file to false. But that's not ideal. So best to use classes instead.

### Old way

I am also adding a method via prototype property instead of doing it directly in the constructor functions (even though I dont have to)

```ts
function Pizza(name: string) {
  this.name = name; //no implicit any error in strict mode
  this.toppings = []; //not possible to specify type of array
}

Pizza.prototype.addTopping = function addTopping(topping: string) {
  this.toppings.push(topping);
};

const pizza = new Pizza("Pepperoni");
pizza.addTopping("pepperoni");

console.log(pizza);
//{ name: 'Pepperoni', toppings: [ 'pepperoni' ] }
```

### Better Appraoch with classes

Using Classes it just better.

This also works in strict mode. Unlike constructore functions.

```ts
class Pizza {
  // We specify types of properties beforehand
  // Improvement 1: This lets us specify the type of array)
  // Improement 2: We actually DONT have to initate an empty array for
  // toppings in the constructor, it gets done here
  name: string;
  toppings: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addTopping(topping: string) {
    this.toppings.push(topping);
  }
}
```

The above gets compiled to the following js as seen the dist folder

So classes are IIFEs, as we can see

```js
var Pizza = /** @class */ (function () {
  function Pizza(name) {
    this.toppings = [];
    this.name = name;
  }
  Pizza.prototype.addTopping = function (topping) {
    this.toppings.push(topping);
  };
  return Pizza;
})();
```

## Private and Public member

According to Todd, JS doesn't have separate private and public members for classes. But I do beleive it can be done via `Symbols` if my memory serves me right

Regardless TS, makes it a whole lot easier. Like in Java etc.

> Private Members can only be accessed from within the class itself

1. Use the `private ` and `public` keywords to make things public or private. Just like Java. But by default everything is public, so dont have to explicitly specify it.

2. The compiled JS code is the same regardless of a property/method being public or private. Srr `dist` folder

3. See example, note that there are 2 ways to initiate properties vai

   ```ts
   class Pizza {
     // We specify types of properties beforehand
     // Improvement 1: This lets us specify the type of array)
     // Improement 2: We actually DONT have to initate an empty array for
     // toppings in the constructor, it gets done here
     private name: string;
     private toppings: string[] = [];

     // way 1 (I prefer this)
     constructor(name: string) {
       this.name = name;
     }

     //way 2 (shorthand)
     constructor(private name: string) {}

     private addTopping(topping: string) {
       this.toppings.push(topping);
     }
   }
   ```

## Readonly Members

1. `readonly` properties can only be read and not updated. `Even from within the class`. Those properties can't be assigned new values

2. If the property is an array you can still alter the array, just not reassign it. I guess the same should apply to objects (didn't test)

```ts
class Pizza {
  readonly name: string;
  readonly toppings: string[] = [];
  readonly prices: { large: number }; //no small

  constructor(name: string) {
    this.prices = { large: 20 };
    this.name = name;
  }

  addTopping(topping: string) {
    this.toppings.push(topping); // OK
    this.prices.large = 40; // OK
    this.prices.small = 20; // ERROR invalid type signature
    this.prices = { large: 20 }; // Reassignment ERROR
    this.name = "dsd"; // Reassignment ERROR
    this.toppings = []; // Reassignment ERROR
  }
}

// An obviously you can't reassign from outside class
```

## Getters & Setters(Accessors)

1. We use the `get` and `set` accessots before our method names

2. Interestingly when creating Getters and Setters in TS, we can actually kinda use overloading. Both the get and set methods can have same name but different params. Getter Typically being empty.

3. You probably can not name them differently like you would in Java ie `getName(), setName(name)`

4. See the compiled JS for why

5. Also we don't invoke the getters and setters in typical OOP fashion of other languages. Instead we access it like an object property.

```ts
class Sizes {
  public sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

// Fires Constructor
const sizes = new Sizes(["small", "medium"]);

// Invokes Getter
console.log(sizes.availableSizes); //[ 'small', 'medium' ]

// Invokes Setter
sizes.availableSizes = ["small", "medium", "large"];

// Invokes Getter Again
console.log(sizes.availableSizes); //["small", "medium", "large"];
```

This is what the compiled JS looks like.

1. It uses the definePropety method and gives us the illusion of overloading.

2. So Iguess you cant name them differently

```js
"use strict";
var Sizes = /** @class */ (function () {
  function Sizes(sizes) {
    this.sizes = sizes;
  }
  Object.defineProperty(Sizes.prototype, "availableSizes", {
    get: function () {
      return this.sizes;
    },
    set: function (sizes) {
      this.sizes = sizes;
    },
    enumerable: false,
    configurable: true,
  });
  return Sizes;
})();
// Fires Constructor
var sizes = new Sizes(["small", "medium"]);
// Invokes Getter
console.log(sizes.availableSizes);
// Invokes Setter
sizes.availableSizes = ["small", "medium", "large"];
// Invokes Getter Again
console.log(sizes.availableSizes);
```

## Classes & Inheritance

Pretty much like JS but with types

```ts
class Sizes {
  public sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

// Using extends just like in JS
class Pizza extends Sizes {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes); //calling Parent constructor
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  addTopping(topping: string) {
    this.toppings.push(topping);
  }
}

// Additional Argument sizes
const pizza = new Pizza("Pepperoni", ["small", "medium", "large"]);
pizza.addTopping("pepperoni");
console.log(pizza);

// Output
// Pizza {
//   sizes: [ 'small', 'medium', 'large' ],
//   toppings: [ 'pepperoni' ],
//   name: 'Pepperoni',
//   prices: { small: 10, large: 20 }
// }
```

This compiled JS is pretty interesting since `classes in JS` is just `syntactical sugar`. You can see it in the `dist folder` that's created.

## Abstract Classes

In the above section we can make a small change as follows if we wanted.

```ts
const sizesObj = new Sizes(["small", "medium", "large"]);
const pizza = new Pizza("Pepperoni", sizesObj.sizes);
pizza.addTopping("pepperoni");
console.log(pizza);
```

1. That is, we can instantiate a sizes object first and then pass it on.

2. But we might not always want to do this.

> You `CAN NOT instantiate an abstract class`. Abstract class simply indicates it's a class we want to extend from later on

So when we just wnat to inherit from a class but never instantiate it on it's own, we can use `Abstract Classes`

```ts
abstract class Sizes {
  public sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

class Pizza extends Sizes {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes);
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  addTopping(topping: string) {
    this.toppings.push(topping);
  }
}
// const sizesObj = new Sizes(); // error
const pizza = new Pizza("Pepperoni", ["small", "medium", "large"]);
pizza.addTopping("pepperoni");
console.log(pizza);
```

## Protected vs Private Members and Inheritance

1. `private` properties are not accessible to `subclasses`

2. If we want them to be accessible in `subclasses`, we use `protected instead`

Here we see private sizes not accessible in pizza sublass

```ts
export abstract class Sizes {
  private sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

export class Pizza extends Sizes {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes);
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  public updateSizes(sizes: string[]) {
    this.sizes = sizes; // ERROR: private property of parent class
  }

  public addTopping(topping: string) {
    this.toppings.push(topping);
  }
}
```

Easy fix, cahnge it to protected

```ts
export abstract class Sizes {
  protected sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

export class Pizza extends Sizes {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes);
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  public updateSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  public addTopping(topping: string) {
    this.toppings.push(topping);
  }
}

const pizza = new Pizza("Pepperoni", ["small", "medium", "large"]);
pizza.addTopping("pepperoni");
pizza.updateSizes(["small", "large"]);
console.log(pizza.availableSizes); // [ 'small', 'large' ]
```

## Interfaces and Classes

1. Interfaces can be combined with classes using `implements` keyword.

2. It's actually very similar to a `Java Interface`. In the sense that it's just a class with properties and method declarations but they are not actually implemeted

3. `Important:` When it comes to describing `getters and setters` in an interface, the syntax is different from a regular function. There are no `()` and you can pretty much only define the return type. So the descriptions aren't very verbose unlike other functions. So it's upto us to make sure they work correctly and things like unit testing can help.

4. `Important:` `private` and `protected` members `CAN'T be defined in an Interface`. `public` and `readonly` properties are fine

5. We can `extend` and Interface just like a class

```ts
interface SizesInterface {
  availableSizes: string[]; // Accessor Function
}

export abstract class Sizes implements SizesInterface {
  protected sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

interface PizzaInterface extends Sizes {
  readonly name: string;
  // toppings: string[]; Error cause toppings is private
  updateSizes(sizes: string[]): void;
  addTopping(topping: string): void;
}

export class Pizza extends Sizes implements PizzaInterface {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes);
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  public updateSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  public addTopping(topping: string) {
    this.toppings.push(topping);
  }
}

const pizza = new Pizza("Pepperoni", ["small", "medium", "large"]);
pizza.addTopping("pepperoni");
console.log(pizza.availableSizes);
pizza.updateSizes(["small", "large"]);
console.log(pizza.availableSizes);
console.log(pizza);

// output
// [ 'small', 'medium', 'large' ]
// [ 'small', 'large' ]
// Pizza {
//   sizes: [ 'small', 'large' ],
//   toppings: [ 'pepperoni' ],
//   name: 'Pepperoni',
//   prices: { small: 10, large: 20 }
// }
```

## Static Properties & Methods

Stactic vs Instance Properties Refresher

1. Static is once per class

2. Instance is once per Object

Some JS examples of static methods I use daily

```JS
// dont have to create a new Object/Instance
// using the new keyword
const date = Date.now()
const array = Array.from('foo')
```

1. static properties in TS can be mutated

   ```ts
   class Coupon {
     static allowed = ["Pepperoni", "Blazing Inferno"];
   }

   console.log(Coupon.allowed);

   Coupon.allowed = []; // This is OK
   ```

2. If you dont want this, we can make it `readonly`

   ```ts
   class Coupon {
     static readonly allowed = ["Pepperoni", "Blazing Inferno"];
   }

   console.log(Coupon.allowed);

   Coupon.allowed = []; // Error
   ```

3. Static Methods

   ```ts
   class Coupon {
     static allowed = ["Pepperoni", "Blazing Inferno"];
     static create(percentage: number) {
       return `PIZZA_${percentage}%`;
     }
   }

   console.log(Coupon.allowed);
   console.log(Coupon.create(25));
   // Output
   // [ 'Pepperoni', 'Blazing Inferno' ]
   // PIZZA_25%
   ```
