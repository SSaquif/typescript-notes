// 1. ANY type (try and avoid using it)
// See that any types can reassigned values of other types

let coupon1; // hover and see, by default coupon is of type any

coupon1 = 25;

coupon1 = "pizza25";

coupon1 = true;

//2. Implicit vs Explicit Type
// If a type is not explicitly defined, then typescript will `infer` a type for the variable

let implicitCoupon = "pizz25"; // Implicit Type
let explicitType: string = "pizza25"; // Explicit Type

// 3. Void Type (ie no type at all, like in other languages ex void keyword in Java)
let selectedTopping: string = "pepperoni";

// hover over the function and see that the return type is void
// if there is no return, the void type is implied, here I have explicitly defined it
function selectTopping(topping: string): void {
  selectedTopping = topping;
}

// 4. Never Types (Basically tells the tsc that the value will never occur)
// Usually used for errors
// In cases as below better to have never type over any type
function orderError(error: string): never {
  throw new Error(error);
}
orderError("Something went wrong");

// null, undefined, strict null checks
