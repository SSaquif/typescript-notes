export interface Person {
  name: string;
  age: number;
}

// Implementing our own Mapped Type Readonly
type MyReadonly<Type> = {
  readonly [Property in keyof Type]: Type[Property];
};

function freezePerson<Type>(obj: Type): MyReadonly<Type> {
  return Object.freeze(obj);
}

const person: Person = {
  name: "Sadnan",
  age: 27,
};

const newPerson = freezePerson(person);
