# Mapped Types

Idea is transforming one type to another type.

[Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) were added in TS 2.1

## Contents

<!-- toc-->

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

### New way, Getting rid of our extra Interface

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

### Old Way, Writing our own Readonly Mapped Type

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

## `Partial` Mapped Ttpe

## `Required` Mapped Type, +/- Modifiers

## `Pick` Mapped Type

## `Record` Mapped Type
