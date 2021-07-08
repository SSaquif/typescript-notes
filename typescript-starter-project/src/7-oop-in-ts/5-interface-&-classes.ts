interface SizesInterface {
  availableSizes: string[]; // Accessor Function
}

export abstract class Sizes implements SizesInterface {
  protected sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

interface PizzaInterface extends Sizes {
  readonly name: string;
  // toppings: string[]; Error cause toppings is private
  updateSizes(sizes: string[]): void;
  addTopping(topping: string): void;
}

export class Pizza extends Sizes implements PizzaInterface {
  readonly name: string;
  private toppings: string[] = [];
  readonly prices: { small: number; large: number };

  constructor(name: string, sizes: string[]) {
    super(sizes);
    this.name = name;
    this.prices = { small: 10, large: 20 };
  }

  public updateSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  public addTopping(topping: string) {
    this.toppings.push(topping);
  }
}

const pizza = new Pizza("Pepperoni", ["small", "medium", "large"]);
pizza.addTopping("pepperoni");
console.log(pizza.availableSizes);
pizza.updateSizes(["small", "large"]);
console.log(pizza.availableSizes);
console.log(pizza);
