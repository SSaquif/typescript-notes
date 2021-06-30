interface Sizes {
  sizes: string[];
}

interface Pizza extends Sizes {
  name: string;
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

let pizza: Pizza;
pizza = createPizza("All Dressed", ["small", "medium", "large"]);

export const name = "Extended Interface, Very Similar to Class Inheritance";
