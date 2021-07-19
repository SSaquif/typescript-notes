const elem = document.querySelector("#anchor");

function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();
  console.log(this.href);
}

if (elem) {
  elem.addEventListener("click", handleClick);
}
