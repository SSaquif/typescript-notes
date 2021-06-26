// Way 1
// Predefined Object Signature

let pizza: {
  name: string;
  price: number;
  getName(): string;
};

pizza = {
  name: "Pepperoni",
  price: 25,
  getName() {
    return this.name;
  },
};

console.log(pizza.getName());

//Way 2
// Object Signature and value assignment all at once
let pizza2: { name: string; price: number; getName(): string } = {
  name: "Pinapple and Ham",
  price: 25,
  getName() {
    return this.name;
  },
};

console.log(pizza2.getName());
