//module conversion
export const moduleName: string = "type aliases";

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

// NTS: The default value does not work, but worked above
// Might as well not have the default value
const selectSize3: Callback = (size: Size1 = "small") => {
  pizzaSize3 = size;
};

selectSize3("large");
console.log(pizzaSize3); //large

// Passing no arguments = error
// selectSize3(); //error
