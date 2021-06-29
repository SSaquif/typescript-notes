// Module Conversion via export statement
export const moduleName: string = "TypeScript Types";

// 1. Types in ts

const pizzaCost: number = 10;

const pizzaToppings: number = 2;

// 2. Functions and Argumnets
function calculatePrice(cost: number, toppings: number): number {
  return cost + 1.5 * toppings;
}

const cost: number = calculatePrice(pizzaCost, pizzaToppings);

console.log(`Pizza cost ${cost}`);

// 3. String Types , String Literals
const coupon: string = "pizza25";

function normalizeCoupon(code: string): string {
  return code.toUpperCase();
}

const couponMessage: string = `The coupon code is ${normalizeCoupon(coupon)}`;
console.log(couponMessage);

// 4. Boolean Type, Boolean Literals
const pizzas: number = 1;

function offerDiscount(orders: number): boolean {
  return orders >= 3;
}

if (offerDiscount(pizzas)) {
  console.log("You get discount");
} else {
  console.log("Order 3 or more pizzas to get discount");
}
