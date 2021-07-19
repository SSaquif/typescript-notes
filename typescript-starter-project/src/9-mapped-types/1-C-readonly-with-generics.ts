export interface Person {
  name: string;
  age: number;
}

function freezePerson<Type>(obj: Type): Readonly<Type> {
  return Object.freeze(obj);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

// TS stills infers it the same
// const newPerson: Readonly<Person>
const newPerson = freezePerson(person);
