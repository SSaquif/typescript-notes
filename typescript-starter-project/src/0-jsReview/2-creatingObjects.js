//1. Object Literal (creating single object)
const animal = {
  species: "dog",
  name: "Tesla",
  sound: function () {
    console.log("woof");
  },
};

animal.sound();

// 2. Factory Functions (returns an object)
// no use of this keyword for propeties
function createAnimal(species, name) {
  return {
    species: species, //no this
    name: name, //no this
    sound: function () {
      // can use this inside function as usual
      if (this.species === "dog") {
        console.log("woof woof woof");
      } else {
        console.log("meow");
      }
    },
  };
}

const dog1 = createAnimal("dog", "Mobius");
console.log(dog1.species);
dog1.sound();

// 3. Constructor Functions
// convention to use PascalNotation like in classes
function Animal(species, name) {
  this.species = species;
  this.name = name;
  this.sound = function () {
    if (this.species === "dog") {
      console.log("woof woof woof");
    } else {
      console.log("meow meow meow");
    }
  };
}

// use of new keyword, like in a Class
const cat1 = new Animal("cat", "Gaya");
console.log(cat1.name);
cat1.sound();
