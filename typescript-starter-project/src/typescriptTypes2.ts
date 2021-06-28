// Module Conversion via export statement
export const moduleName: string = "TypeScript Types 2";

// Function Type

// Way 1 //
// Create a variable and assign it's type to be function
let sumOrder: Function;

// Define the function and details later when you create the arrow function
sumOrder = (price: number, quantity: number) => price * quantity;

const sum1 = sumOrder(25, 2);
console.log(sum1);

// Way 2 //
// Create a variable BUT also define it's structure right away
// Advantage we can export/import this type definition in our program
let sumOrderVerbose: (price: number, quantity: number) => number;

// Now when you declare the function, it's cleaner
// You can rename the params but could have also kept them as quantity and price
sumOrderVerbose = (x, y) => x * y;

const sum2 = sumOrderVerbose(25, 2);
console.log(sum2);

// Way 3 : too confusing imo
let sumOrder3: (price: number, quantity: number) => number = (x, y) => x * y;

// Way4: I rather do this in that case
let sumOrder4 = (price: number, quantity: number): number => price * quantity;

console.log("Way 3", sumOrder3(10, 2)); //20
console.log("Way 4", sumOrder4(15, 3)); //45

// Optional Params
// We use the ?: operator in our function signature
let sumOrder5: (prce: number, quantity?: number) => number;

sumOrder5 = (x, y) => {
  if (y) {
    return x * y;
  }
  return x;
};

console.log("with optional params", sumOrder5(100)); //100;

// Default Params
let sumOrder6: (prce: number, quantity?: number) => number;

sumOrder6 = (x, y = 1) => x * y;

console.log("with default params", sumOrder6(100)); //100;
console.log("with default params", sumOrder6(100, 2)); //200;
