export interface Person {
  name: string;
  age: number;
}

type MyPartial<Type> = {
  [Property in keyof Type]?: Type[Property];
};

function updatePerson(person: Person, prop: MyPartial<Person>) {
  return { ...person, prop };
}

function updatePerson2(person: Person, prop: Partial<Person>) {
  return { ...person, prop };
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

updatePerson(person, { age: 28 });

updatePerson2(person, { name: "Saquif" });

console.log(person);
