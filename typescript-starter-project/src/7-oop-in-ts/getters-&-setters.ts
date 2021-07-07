class Sizes {
  public sizes: string[];

  constructor(sizes: string[]) {
    this.sizes = sizes;
  }

  set availableSizes(sizes: string[]) {
    this.sizes = sizes;
  }

  get availableSizes() {
    return this.sizes;
  }
}

// Fires Constructor
const sizes = new Sizes(["small", "medium"]);

// Invokes Getter
console.log(sizes.availableSizes);

// Invokes Setter
sizes.availableSizes = ["small", "medium", "large"];

// Invokes Getter Again
console.log(sizes.availableSizes);
