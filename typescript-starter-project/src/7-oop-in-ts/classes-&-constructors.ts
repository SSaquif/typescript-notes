// This file has a whole bunch of commented out code
// where I played around with the possibilities

export const name = "Classes & Constructor Functions in TS";

class Pizza {
  // We specify types of properties beforehand
  // Improvement 1: This lets us specify the type of array)
  // Improement 2: We actually DONT have to initate an empty array for
  // toppings in the constructor, it gets done here
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string) {
    this.prices = { small: 10, large: 20 };
    this.name = name;
  }

  addTopping(topping: string) {
    this.toppings.push(topping);
  }
}

const pizza = new Pizza("Pepperoni");
pizza.addTopping("pepperoni");
pizza.addTopping("cheese");

console.log("pizza", pizza);

// Playground 1

// class Pizza {
//   // We specify types of properties beforehand
//   // Improvement 1: This lets us specify the type of array)
//   // Improement 2: We actually DONT have to initate an empty array for
//   // toppings in the constructor, it gets done here
//   readonly name: string;
//   readonly toppings: string[] = [];
//   readonly prices: { large: number; small?: number };

//   constructor(name: string) {
//     this.prices = { large: 20 };
//     this.name = name;
//   }

//   addTopping(topping: string) {
//     this.toppings.push(topping);
//     this.prices.large = 40;
//     this.prices.small = 20;
//     // this.prices = { large: 20 };
//     // this.name = "dsd";
//     // this.toppings = [];
//   }
// }
// Old Way
// function Pizza(name: string) {
//   this.name = name; //no implicit any error in strict mode
//   this.toppings = [];
// }

// Pizza.prototype.addTopping = function addTopping(topping: string) {
//   this.toppings.push(topping);
// };

// const pizza = new Pizza("Pepperoni");
// pizza.addTopping("pepperoni");

// console.log("pizza", pizza);
