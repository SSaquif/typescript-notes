// 1. Arguments keyword
function sum() {
  let total = 0;
  console.log(arguments); //checking arguments

  for (let value of arguments) {
    console.log(value);
    total += value;
  }
  return total;
}
console.log(sum(1, 2, 3, 4, 5));
