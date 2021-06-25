# Primitive Types

## General

1. Reminder: 3. You cant reuse variable names in different files unless you use module system (havent learnt that yet)

2. JS Number() and TS numbner are not the same, same goes for other constructor. (We will see the difference later)

3. By default , variables in in ts files are assigned a type once they are first assigned a value

4. It's not possible to change the type later

   ```typescript
   let cost = 20; // Cost = number

   cost = `30`; //error
   ```

5. When we are in strict mode, variables are NOT of `any` type by default, so all variables including function parameters must have a type explicitly given to it

## Detailed Notes

This is just code from the `primitiveTypes.ts` file.

```typescript
// 1. Types im ts
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
```
