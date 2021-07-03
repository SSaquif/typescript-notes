// 1. Function Declaration
// hoisting is supported for fd
// hoisting is the process by which function DECLARATIONS
// are moved to the top at runtime
talk(); //hoisting
function talk() {
  console.log("hello world");
}

// 2. Function Expression (No hoisting)
// A. Named Function Expression
const bark = function bark() {
  console.log("woof woof");
};
bark(); //no hoisting

// B. Anonymous function Expression
const meow = function () {
  console.log("meow");
};
meow(); //not hoisted

// Arrow functions
// arrow functions are not hoisted as well
const moo = () => {
  console.log("moo");
};
moo(); //Not hoisted
