class Coupon {
  static allowed = ["Pepperoni", "Blazing Inferno"];
  static create(percentage: number) {
    return `PIZZA_${percentage}%`;
  }
}

console.log(Coupon.allowed);
console.log(Coupon.create(25));
