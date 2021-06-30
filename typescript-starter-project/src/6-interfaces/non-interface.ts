// Using Type instead of Interface

type Pizza = {
  name: string;
  sizes: string[]; // array of strings
};

function createPizza(name: string, sizes: string[]): Pizza {
  return {
    name,
    sizes,
  };
}

let pizza: Pizza;

pizza = createPizza("All Dressed", ["small", "medium", "large"]);

//module conversion
export const name = "Not an Interface";
