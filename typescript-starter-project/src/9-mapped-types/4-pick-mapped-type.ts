interface Person {
  name: string;
  age: number;
  address: {};
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

const person: MyPick<Person, "name" | "age"> = {
  name: "Sadnan",
  age: 27,
};
