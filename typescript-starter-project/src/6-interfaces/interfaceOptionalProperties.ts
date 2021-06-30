interface Sizes {
  sizes: string[];
}

interface Pizza extends Sizes {
  name: string;
  toppings?: number; //optional property
  getAvailableSizes(): string[];
}

function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
    getAvailableSizes() {
      return this.sizes;
    },
  };
}

let pizza: Pizza = createPizza("All Dressed", ["small", "medium", "large"]);

//adding optional property later
pizza.toppings = 5;

console.log(pizza);

export const name = "Optional Properties";
