# Mapped Types

Idea is transforming one type to another type.

> Side Note: You can always `ctrl/cmd + click` on the Readonly, Partial etc Mapped Types in the code and see the actual code for them

[Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) were added in TS 2.1

## Contents

<!-- toc -->

- [`Readonly` Mapped Type](#readonly-mapped-type)
  * [Idea of Mapped Types using Readonly](#idea-of-mapped-types-using-readonly)
  * [New Way, Getting Rid of Our Extra Interface](#new-way-getting-rid-of-our-extra-interface)
  * [Mapped Types with Generics](#mapped-types-with-generics)
  * [Old Way, Writing Our Own Readonly Mapped Type](#old-way-writing-our-own-readonly-mapped-type)
- [`Partial` Mapped Type](#partial-mapped-type)
  * [Creating A New Interface](#creating-a-new-interface)
  * [Our Custom Partial Mapped Type](#our-custom-partial-mapped-type)
  * [Built In Partial Mapped Type](#built-in-partial-mapped-type)
- [`Required` Mapped Type, +/- Modifiers](#required-mapped-type---modifiers)
  * [+/- Modifiers](#--modifiers)
  * [Fixing Our initial Issue](#fixing-our-initial-issue)
- [`Pick` Mapped Type](#pick-mapped-type)
  * [Breakdown](#breakdown)
- [`Record` Mapped Type](#record-mapped-type)
  * [A Dictionary Implementation](#a-dictionary-implementation)
  * [Record Mapped Type](#record-mapped-type)
  * [Updating the Dictionary](#updating-the-dictionary)
  * [No Interface](#no-interface)
  * [Advantages of using Record for Dictionaries](#advantages-of-using-record-for-dictionaries)
- [Summary](#summary)

<!-- tocstop -->

## `Readonly` Mapped Type

The idea for this section is we want to create objects which are not mutable. In other words they are only read only.

TS has a built in Mapped Type `Readonly`

### Idea of Mapped Types using Readonly

First lets do it the old way. Say we have a interface Person but now we want to map them to be ReadonlyPerson, in order for the objects to be non-mutable.

Technically it's not the old way. See after code for why.

```ts
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

function freezePerson(person: Person): ReadonlyPerson {
  // hover over the freeze function, and see it's using
  // the built in Readonly mapped type (see next comment)
  // ObjectConstructor.freeze<Person>(o: Person): Readonly<P>
  return Object.freeze(person);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

// function freezePerson(person: Person): ReadonlyPerson
const newPerson = freezePerson(person);
```

So this is technically not the old way, as the `freeze` function makes use of the mapped type `Readonly`. Which returns an object that matches the structure defined in our `ReadonlyPerson Interface`, and hence there are no errors

### New Way, Getting Rid of Our Extra Interface

So we can actually remove our extra interface. This code is identical to the one above

```ts
interface Person {
  name: string;
  age: number;
}

// we don't have to explicitly say the return type
function freezePerson(person: Person) {
  return Object.freeze(person);
}

// Alternately
// but we could be more sppecific if we wanted
function freezePerson(person: Person): Readonly<Person> {
  return Object.freeze(person);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

// const newPerson: Readonly<Person>
const newPerson = freezePerson(person);
```

### Mapped Types with Generics

In the alternate version for freezePerson function object, we already used a bit of generics. But now let's make the function more universal using Generics.

```ts
export interface Person {
  name: string;
  age: number;
}

// Using Generics
function freezePerson<Type>(obj: Type): Readonly<Type> {
  return Object.freeze(obj);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

// TS stills infers it the same
// const newPerson: Readonly<Person>
const newPerson = freezePerson(person);
```

### Old Way, Writing Our Own Readonly Mapped Type

So now if we combine what we learned we can write our own Mapped Type Readonly as follows

```ts
export interface Person {
  name: string;
  age: number;
}

// Implementing our own Mapped Type Readonly
type MyReadonly<Type> = {
  readonly [Property in keyof Type]: Type[Property];
};

function freezePerson<Type>(obj: Type): MyReadonly<Type> {
  return Object.freeze(obj);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

const newPerson = freezePerson(person);
```

If type is `Person` then the `MyReadonly type` breaks down as follows

```ts
type MyReadonly<Person> = {
  readonly [Property in keyof Person]: Person[Property];
};

// which will be converted to this
type MyReadonly<Person> = {
  readonly name: string;
  readonly age: number;
};

// which is the same as the interface we had
// at the very beginning
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
```

## `Partial` Mapped Type

Lot of times we want to partially update some data structure (mostly objects)

In this example we are updating only certain fields of an existing object.

To do this we first create a new interface. But this is not very DRY.

So we then create a custom Partial Mapped Type and Finally just use the built in one

### Creating A New Interface

```ts
interface Person {
  name: string;
  age: number;
}

interface PartialPerson {
  name?: string;
  age?: number;
}

// Can be used to update any 1 or multiple properties of the object
function updatePerson(person: Person, prop: PartialPerson) {
  return { ...person, prop };
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

updatePerson(person, { age: 28 });

console.log(person);
```

### Our Custom Partial Mapped Type

Tthis is what the Partial Mapped type would look like

```ts
type MyPartial<Type> = {
  [Property in keyof Type]?: Type[Property];
};

function updatePerson(person: Person, prop: MyPartial<Person>) {
  return { ...person, prop };
}
```

### Built In Partial Mapped Type

Finally we can just use the Built-in one and not create any type/interface

```ts
function updatePerson(person: Person, prop: Partial<Person>) {
  return { ...person, prop };
}
```

## `Required` Mapped Type, +/- Modifiers

Kind of the opposite of `Partial`. We make something required or not required by using the `+` or `-` modifiers.

We can use it in conjuction with `?` with convert something that is optional into something that is required (`+`) or to remove it (`-`)

In the following code we have age as an optional property, and the code perfectly valid. This results in undefined being printed at run time as the error is not caught by the compiler

```ts
export interface Person {
  name: string;
  age?: number;
}

function printDetails(person: Person) {
  return `${person.name} is ${person.age}`;
}

const person: Person = {
  name: "Sadnan",
  //   age: 27,
};

// No errors
const details = printDetails(person);

// We get undefined printed
// Sadnan is undefined
console.log(details);
```

### +/- Modifiers

We can make any optional propety required by using the `-` operator. We can keep them optional using the `+` operator. So let's create our Required mapped type as follows. We also have a redundant Partial as follows

```ts
export interface Person {
  name: string;
  age?: number;
}

// The `-` removes the `?` from optional properties
// In this cage age would no longer be optional
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// The '+' simply adds the '?'
// Hence it's rather redundant
type MyPartial<T> = {
  // The '+' is redundant
  [P in keyof T]+?: T[P];
};

// The above is type identical this one
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
```

However we can use `+/-` modifiers with pother operators too.
in the example below we are creating a mapped type which converts all the properties to be readonly and required.

Alternatively we could also remove any `readonly` rpoperties from a type using `-` instead

```ts
type MyRequiredReadonly<T> = {
  +readonly [P in keyof T]-?: T[P];
};
```

### Fixing Our initial Issue

Finally here's our solution to our initial problem

```ts
export interface Person {
  name: string;
  age?: number;
}

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

function printDetails(person: MyRequired<Person>) {
  return `${person.name} is ${person.age}`;
}

// Built in Required map
function printDetails2(person: Required<Person>) {
  return `${person.name} is ${person.age}`;
}

const person: MyRequired<Person> = {
  name: "Sadnan",
  age: 27,
};

const person2: Required<Person> = {
  name: "Saquif",
  age: 27,
};

// No errors
const details = printDetails(person);
const details2 = printDetails2(person2);

console.log(details);
console.log(details2);
```

## `Pick` Mapped Type

Pick Mapped Type is a bit different.

It's kind of similar to `lodash's pluck function`

It let's us cherry pick the properties of a Type/Interface we want to use instead of having to use all of them. Kind of like an advanced version of `Partial`

```ts
interface Person {
  name: string;
  age: number;
  address: {};
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

const person: MyPick<Person, "name" | "age"> = {
  name: "Sadnan",
  age: 27,
};

// built in
const person: Pick<Person, "name" | "age"> = {
  name: "Sadnan",
  age: 27,
};
```

### Breakdown

The following contains the interestin parts of the code

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

const person: MyPick<Person, "name" | "age"> = {
  name: "Sadnan",
  age: 27,
};
```

From last section, we know `K extends keyof T` means that `type K` has to be `some combination of the keys in type T, ie an Union Type`.

In our case `Union type K` is the combination `"name"|"age"` of type `Person`

`[P in K]: T[P];` is simply means for each property in the `Union Type K` ("name"|"age"), get the type of those properties from `T ie Interface Person in this case`

## `Record` Mapped Type

This mapped type is often used when we adopt the `Dictionary Pattern`

### A Dictionary Implementation

First let's create our own dictionary from scratch and later we will replace it with a Record type

```ts
let dictionary: { [key: string]: any } = {};

// can think of this as some kind of data stucture
// similar to a linked list
// current = address/hash some refrence to current item
// next = address/hash some refrence to next item
interface TrackStates {
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
```

### Record Mapped Type

Won't be creating this one from scratch, but this is what the built in implementation looks like

```ts
// From video
type Record<K extends keyof string, T> = {
  [P in K]: T;
};

// When I checked it, string replaced with any
type Record<K extends keyof string, T> = {
  [P in K]: T;
};
```

### Updating the Dictionary

Fianlly we can update our dictionary implementation to use `Record`

```ts
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
```

### No Interface

Finally let's say we don't have access to any interface. We can use `typeof` instead

But interfaces should be preferred

```ts
let dictionary: Record<string, typeof item1> = {};

// Less Dynamic
const item1: Record<"current" | "next", string> = {
  current: "js02js9",
  next: "jdska29w",
};

dictionary[0] = item1;
```

### Advantages of using Record for Dictionaries

1. We have more control of what our dictionary can look like

2. ie it's more customised

3. We can choose what are the valid key names

4. We can also decide what the valid values of those keys are

5. We don't need the interface, can use typeof instead

[Video on Records](https://app.ultimatecourses.com/course/typescript-masterclass/record-mapped-type)

> However implenting dictionaries do seem a bit of extra work to me. I need to look into more real life use cases for them

## Summary

1. Using built-in/custom Mapped Types saves us from creating a whole bunch of similar looking Interfaces over and over again

2. User `ctrl/cmd + click`, to see the actual implemtation of any built in mapped types

3. I should look more into the dictionary pattern and it's use in TS. Will help undesrstand record better
