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

## User Defined Type Guards

## Literal Type Guards and `in` Operator
