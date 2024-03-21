# Typing this & noImplicitThis

Declaring a type for `this` keyword is very simple in ts.

It simply comes before the first argument

The second argument in this case event, is still the real fist argument to the function

Note that all DOM objects have their own type type definitions. In this case href are HTMLAnchorElements and event objects have type Event

> Apparently newer versions of ts are better at inferring the type of this, so you don't have to do it as often

```ts
const elem = document.querySelector("#anchor");

function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();
  console.log(this.href);
}

// if because elem could be null
if (elem) {
  elem.addEventListener("click", handleClick);
}

// ?. (optional chaining) did not work
// probably need to update my TS version for it
elem?.addEventListener("click", handleClick, false);
```
