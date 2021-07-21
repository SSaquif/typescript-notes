export class Foo {
  constructor() {}
}

const bar = new Foo();

//identical comparisons
console.log(Object.getPrototypeOf(bar) === Foo.prototype); //true
console.log(bar instanceof Foo); //true
