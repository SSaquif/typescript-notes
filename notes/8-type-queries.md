# Type Queries

1. There are many cases where TS will infer the type for us.

2. However, there are many ocassions were we might want to take the value of a type from an existing item and bind it to something else.

3. It might also be that we do not have access to the types that are for example provided by what we would call an anonymous type

`typeof` and `keyof` can be useful in those cases

## Contents

<!-- toc -->

- [`typeof` Type Queries](#typeof-type-queries)
- [`keyof` Index Type Queries, Lookup Types and Generics](#keyof-index-type-queries-lookup-types-and-generics)

<!-- tocstop -->

## `typeof` Type Queries

The `typeof` operator works slightly differently in TS.

> We can use `typeof` for type declarations and this is called a type query. But we can also use it like in JS as well.

Let's say we have a object literal `person` as described below. In TS if we hover over the object the type will automatically be inferred

```ts
// For this object tyoe will be inferred (hover and see inferred type)
// Even though we have not declared any types

const person = {
  name: "Sadnan",
  age: 27,
};
```

But a lot of times TS can't infer type cause `we don't have access to the object`. For example

1. The object might be coming through or

2. It might be refrencing a DOM node

What if we wanted to bind the type of such non inferaable objects to something else?

So let's say for some reason we can't access type definition. Then we might want to access this anonymous type as below

```ts
type Person = typeof person;

// as opposed to JS
//typeof person // 'object'
```

In JS `typeof person` would simply return object.

> But in TS we are actually inferring the type definition of the object and creating a new type Person

Then we can bind the newly created type to other objects as below. Now `anotherPerson` needs to have the same type signature as the `person object`

```ts
const anotherPerson: Person = {
  name: "John",
  age: 30,
};
```

## `keyof` Index Type Queries, Lookup Types and Generics

We can create Union Types from Object keys in TS. Apparently this has many use cases.

After that we can achieve something called `typesafe lookup` types. Which basically simplies the previous Union types to it's native types.

This process helps our app with demonstrate more typesafe behaviour

```ts
export const person = {
  name: "Sadnan",
  age: 27,
};

type Person = typeof person;

// Creating Union Types from Object Keys
// This will be string literal types
// type PersonKeys = "name" | "age"
type PersonKeys = keyof Person;

// typesafe lookup types
// type PersonTypes = string | number
type PersonTypes = Person[PersonKeys];
```

1. `type PersonKeys = keyof Person;` This helps us quickly llokup the keys of an Object

2. `type PersonTypes = Person[PersonKeys];`. This helps us figure out actuall types of those keys

Next we will demonstrate the power of genric types together with lookup types.

We often wnat to get an property from an object, so we start by writing a function for that

1. This is a `generic`, `<T, K extends keyof T>`

2. T and K are generic types

3. Angular `<>` brackets are where we declare our generic Types

4. Now we can break this `<T, K extends keyof T>(obj: T, key: K)` down

   1. We have declared 2 generics types T and K

   2. K will take on one of the types of a key in T by using 'extends keyof' together

   3. Hence T is an object, since it has keys

5. This helps us creates an universal function like `getProperty()`

6. Whose return value can always be type inferred

> Side Note (Generics Refresher): In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types. Think of `ArrayList<T>` in Java that I used all the time. The T could take on any type. But do remember here we are using Generic Functions so there are differences in JS. But the idea of a more universal function or class etc, still holds.

```ts
const person = {
  name: "Sadnan",
  age: 27,
};

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// types of personName and personAge
// is now inferred automatically by TS
const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");
```
