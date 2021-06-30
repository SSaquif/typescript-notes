interface Sizes {
  sizes: string[];
}

interface Pizza extends Sizes {
  name: string;
  toppings?: number; //optional property
  // Can have both if we want
  // [key: number]: string;
  [key: string]: any;
  // Nested Index Signature
  dictionary?: {
    [key: string]: any;
  };
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

// Index Signature
// Can create one or many Dynamic properties
pizza[1] = "xyz";
// pizza[2] = "abc";
pizza["abc"] = "xyz";

console.log(pizza);

export const name = "Interface with Index Signature";
