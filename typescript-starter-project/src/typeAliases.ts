//module conversion
export const moduleName: string = "type aliases";

//
let pizzaSize: "small" | "medium" | "large" = "small";

const selectSize = (size: "small" | "medium" | "large" = "small") => {
  pizzaSize = size;
};

selectSize("small");
