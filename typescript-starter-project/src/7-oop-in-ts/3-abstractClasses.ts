export abstract class Sizes {
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

export class Pizza extends Sizes {
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
pizza.updateSizes(["small", "large"]);
console.log(pizza.availableSizes);
