export interface Person {
  name: string;
  age?: number;
}

function printDetails(person: Person) {
  return `${person.name} is ${person.age}`;
}

const person: Person = {
  name: "Sadnan",
  //   age: 27,
};

// No errors
const details = printDetails(person);

// We get undefined printed
// Sadnan is undefined
console.log(details);
