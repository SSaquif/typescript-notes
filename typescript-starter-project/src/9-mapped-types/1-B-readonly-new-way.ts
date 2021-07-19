export interface Person {
  name: string;
  age: number;
}

// we don't have to explicitly say the return type
function freezePerson(person: Person) {
  return Object.freeze(person);
}

// Alternately
// but we could be more sppecific if we wanted
// function freezePerson(person: Person): Readonly<Person> {
//   return Object.freeze(person);
// }

const person: Person = {
  name: "Sadnan",
  age: 27,
};

// const newPerson: Readonly<Person>
const newPerson = freezePerson(person);
