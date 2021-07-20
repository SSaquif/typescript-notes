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
- [Our Custom Partial Mapped Type](#our-custom-partial-mapped-type)
- [Built In Partial Mapped Type](#built-in-partial-mapped-type)
- [`Required` Mapped Type, +/- Modifiers](#required-mapped-type---modifiers)
  * [+/- Modifiers](#--modifiers)
- [Fixing Our initial Issue](#fixing-our-initial-issue)
- [`Pick` Mapped Type](#pick-mapped-type)
- [`Record` Mapped Type](#record-mapped-type)
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

## Our Custom Partial Mapped Type

Tthis is what the Partial Mapped type would look like

```ts
type MyPartial<Type> = {
  [Property in keyof Type]?: Type[Property];
};

function updatePerson(person: Person, prop: MyPartial<Person>) {
  return { ...person, prop };
}
```

## Built In Partial Mapped Type

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

## Fixing Our initial Issue

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

## `Record` Mapped Type

## Summary

1. Using built-in/custom Mapped Types saves us from creating a whole bunch of similar looking Interfaces over and over again

2. User `ctrl/cmd + click`, to see the actual implemtation of any built in mapped types
