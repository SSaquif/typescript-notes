// Using Type instead of Interface

interface Pizza {
  name: string;
  sizes: string[]; // array of strings
}

function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
  };
}

//Combining Interface
interface Pizzas {
  data: Pizza[];
}

let pizza: Pizza;

pizza = createPizza("All Dressed", ["small", "medium", "large"]);

export const name = "A very basic Interface";
