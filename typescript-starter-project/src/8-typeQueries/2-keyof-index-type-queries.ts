export const person = {
  name: "Sadnan",
  age: 27,
};

type Person = typeof person;

// Creating Union Types from Object Keys
type PersonKeys = keyof Person;

// typesafe lookup: returns a Union Type again
// Which basically simplies the previous Union types to it's native types.
type PersonTypes = Person[PersonKeys];
