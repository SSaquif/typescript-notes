# Type Guards

Type Guards are way to get hold of type information after making a check inside of a conditional statement

TS by default knows what are the valid types within and outside condtional scopes

```ts
export function foo(bar: string | number) {
  if (typeof bar === "string") {
    // TS knows here bar will be a string
    // bar.toExponential(); //error
    return bar.toUpperCase();
  }
  // TS knows here bar will be a number
  bar.toExponential();
}
```

## Contents

<!-- toc -->

- [`typeof` & Type Guards](#typeof--type-guards)
- [`instanceof` & Type Guards](#instanceof--type-guards)
  * [OOP review](#oop-review)
  * [Assertion using `as` vs `instanceof`](#assertion-using-as-vs-instanceof)
- [User Defined Type Guards & `is` Operator](#user-defined-type-guards--is-operator)
    + [Issue](#issue)
    + [Fix](#fix)
- [Literal Type Guards and `in` Operator](#literal-type-guards-and-in-operator)
  * [Literal Type](#literal-type)
  * [`in` Operator](#in-operator)
  * [Using them together (Did not work for me )](#using-them-together-did-not-work-for-me-)

<!-- tocstop -->

## `typeof` & Type Guards

Here's a bit more complex example (not really), but with type guards TS can successfully infer different types of same variables within different scopes

```ts
export class Song {
  public title: string;
  public duration: string | number;

  constructor(title: string, duration: string | number) {
    this.title = title;
    this.duration = duration;
  }
}

function getSongDuration(item: Song) {
  if (typeof item.duration === "string") {
    return item.duration;
  }

  // here we can use methods that work on number
  const { duration } = item;
  const minutes = Math.floor(duration / 60000);
  const seconds = (duration / 1000) % 60;

  return `${minutes}:${seconds}`;
}

const songDurationFromString = getSongDuration(new Song("Haha", "2:30"));
console.log(songDurationFromString);

const songDurationFromMS = getSongDuration(new Song("Haha", 150000));
console.log(songDurationFromMS);
```

## `instanceof` & Type Guards

### OOP review

Just a quick reminder that classes in JS are just syntactical sugar. An JS objects are based on prototypal inheritance. Therefore the 2 following comparisons are identical

```ts
class Foo {
  constructor() {}
}

const bar = new Foo();

//identical comparisons
console.log(Object.getPrototypeOf(bar) === Foo.prototype); //true
console.log(bar instanceof Foo); //true
```

### Assertion using `as` vs `instanceof`

> In practice don't use `as`, use `instanceof`

```ts
class Song {
  constructor(public title: string, public duration: number) {}
}

class Playlist {
  constructor(public name: string, public songs: Song[]) {}
}

// with instanceof
function getItemName(item: Song | Playlist) {
  if (item instanceof Song) {
    return item.title;
  }
  return item.name;
}

// with as
function getItemName2(item: Song | Playlist) {
  if ((item as Song).title) {
    return (item as Song).title;
  }
  return (item as Playlist).name;
}
```

## User Defined Type Guards & `is` Operator

We can create out own type guards by writing functions that return boolean after asserting a type for the passed object as below.

But doing so TS once again loses it's ability to infer the type inside and after the conditional.

#### Issue

```ts
function isSong(item: any) {
  return item instanceof Song;
}

// This is valid code but the tsc will throw error
function getItemName(item: Song | Playlist) {
  if (isSong(item)) {
    return item.title; // compilation error
  }
  return item.name; // compilation error
}
```

Now we can use `as` to fix but there is a better way using `is`

We simply update out type assetion function as follows

#### Fix

```ts
function isSong(item: any): item is Song {
  return item instanceof Song;
}

function getItemName(item: Song | Playlist) {
  if (isSong(item)) {
    return item.title;
  }
  return item.name;
}
```

## Literal Type Guards and `in` Operator

Personally avoid this. The last part might have been deprecated cause it did not work for me

### Literal Type

```ts
// type of foo is bar, and not string
// this is a literal type
// const foo: "bar" (see this on hover)
const foo = bar;
```

### `in` Operator

A quick refresher on how we can use `in`

```ts
// Example 1
const obj = { name: "Sadnan" };
for (const key in obj) {
  console.log(key); //name
}

// Example 2
const exists = "name" in obj;
console.log(exists); //true
```

In the context of our previous examples we could od the following to check if a certain property exists, Think you can do this JS nowadays as well

```ts
// returns boolean by checking if property exits or not
function isSong(item: any): item is Song {
  return "title" in item;
}
```

### Using them together (Did not work for me )

```ts
export class Song {
  kind = "song"; // Literal Type
  constructor(public title: string, public duration: number) {}
}

export class Playlist {
  kind = "playlist"; // Literal Type
  constructor(public name: string, public songs: Song[]) {}
}

// returns boolean by checking if property exits or not
function isSong(item: any): item is Song {
  return "title" in item;
}

// This did not work for me (avoid this)
function getItemName(item: Song | Playlist) {
  if (item.kind === "song") {
    return item.title;
  }
  return item.name;
}
```
