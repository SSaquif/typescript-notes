//module conversion
export const moduleName: string = "type assertion";

// Type  Assertioon = Basically cheking what types we getting back

type Pizza = { name: string; toppings: number };

const pizza: Pizza = { name: "toute garnie", toppings: 5 };

const serializedPizza = JSON.stringify(pizza);

// Way 1
function getNameFromJSON(obj: string) {
  return (<Pizza>JSON.parse(obj)).name;
}

// Way 2
function getNoOfToppingsFromJSON(obj: string) {
  return (JSON.parse(obj) as Pizza).toppings;
}

getNameFromJSON(serializedPizza);
getNoOfToppingsFromJSON(serializedPizza);
