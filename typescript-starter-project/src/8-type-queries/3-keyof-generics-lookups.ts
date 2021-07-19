const person = {
  name: "Sadnan",
  age: 27,
};

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// types of personName and personAge
// is now inferred automatically by TS
export const personName = getProperty(person, "name");
export const personAge = getProperty(person, "age");
