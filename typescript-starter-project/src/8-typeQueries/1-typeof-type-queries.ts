// For this object tyoe will be inferred (hover and see inferred type)
// Even though we have not declared any types
export const person = {
  name: "Sadnan",
  age: 27,
};

// Inferring type of a known/anonymous object
// And creating a new type Person
type Person = typeof person;

// Binding the new type to some new object anotherPerson
const anotherPerson: Person = {
  name: "John",
  age: 30,
};
