export interface Person {
  name: string;
  age: number;
}

interface PartialPerson {
  name?: string;
  age?: number;
}

function updatePerson(person: Person, prop: PartialPerson) {
  return { ...person, prop };
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

updatePerson(person, { age: 28 });

console.log(person);
