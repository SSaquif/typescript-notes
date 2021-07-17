# Type Aliases & Type Assertions

## Contents

<!-- toc -->

- [Type Aliases](#type-aliases)
- [Type Assertions (Method 1)](#type-assertions-method-1)
- [Type Assertions (Method 2) a new addition to TS](#type-assertions-method-2-a-new-addition-to-ts)

<!-- tocstop -->

## Type Aliases

We can create our own types and resuse them across our code

```ts
// The Problem: Repetion of code
// Variable and piszzaSize and param size can take on the same possible values
// We are repeating the values in 2 places

let pizzaSize: "small" | "medium" | "large" = "small";

const selectSize = (size: "small" | "medium" | "large" = "small") => {
  pizzaSize = size;
};

selectSize("medium");
console.log(pizzaSize); //medium

// The Solution: Type Alias
// We create our own custom type Size
type Size = "small" | "medium" | "large";

let pizzaSize2: Size = "small";

const selectSize2 = (size: Size = "small") => {
  pizzaSize2 = size;
};

selectSize2();
console.log(pizzaSize2); //small (uses default value)

// One More thing
// Finally, we can combine this with function types as well
type Size1 = "small" | "medium" | "large";
// Our function takes in a Size and returns nothing
type Callback = (size: Size1) => void;

let pizzaSize3: Size1 = "small";

// Pitfall
// NTS: The default value does not work (with this syntax),
// But worked above, Might as well not have the default value
const selectSize3: Callback = (size: Size1 = "small") => {
  pizzaSize3 = size;
};

selectSize3("large");
console.log(pizzaSize3); //large

// Passing no arguments = error
selectSize3(); //tsc compiler error
```

## Type Assertions (Method 1)

```ts
type Pizza = { name: string; toppings: number };

const pizza: Pizza = { name: "toute garnie", toppings: 5 };

const serializedPizza = JSON.stringify(pizza);

function getNameFromJSON(obj: string) {
  // Type assertion
  return (<Pizza>JSON.parse(obj)).name;
}

getNameFromJSON(serializedPizza);
```

1. Here we are wrapping `JSON.parse(obj)` in a extra pair of brackets `()`, ie. `(<Pizza>JSON.parse(obj))`

2. And then adding the type assertion `<Pizza>`, which tells the tsc that a Pizza type is expected back

3. This will then give us access to autocomplete, help with debugging etc

4. However this syntax clashes with JSX, `<Pizza>` looks like a html tag

## Type Assertions (Method 2) a new addition to TS

1. Suffix `as Pizza` instead

```ts
// Way 2
function getNoOfToppingsFromJSON(obj: string) {
  return (JSON.parse(obj) as Pizza).toppings;
}
```
