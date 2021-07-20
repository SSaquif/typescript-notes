export interface Person {
  name: string;
  age?: number;
}

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// A more complex example using +/- operator
type MyRequiredReadonly<T> = {
  +readonly [P in keyof T]-?: T[P];
};

function printDetails(person: MyRequired<Person>) {
  return `${person.name} is ${person.age}`;
}

function printDetails2(person: Required<Person>) {
  return `${person.name} is ${person.age}`;
}

const person: MyRequired<Person> = {
  name: "Sadnan",
  age: 27,
};

const person2: Required<Person> = {
  name: "Saquif",
  age: 27,
};

// No errors
const details = printDetails(person);
const details2 = printDetails2(person2);

console.log(details);
console.log(details2);
