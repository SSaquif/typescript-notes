// The interface basic says what an Pizza object looks like
interface Pizza {
  name: string;
  sizes: string[]; // array of strings
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

const sizes = pizza.getAvailableSizes();
console.log(sizes);

export const name = "A Interface with a function";
