export class Sizes {
  public sizes: string[];

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

  addTopping(topping: string) {
    this.toppings.push(topping);
  }
}
const sizesObj = new Sizes(["small", "medium", "large"]);
const pizza = new Pizza("Pepperoni", sizesObj.sizes);
pizza.addTopping("pepperoni");
console.log(pizza);
