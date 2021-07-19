export interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

function freezePerson(person: Person): ReadonlyPerson {
  return Object.freeze(person);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

//function freezePerson(person: Person): ReadonlyPerson
const newPerson = freezePerson(person);
