# OOP

In this section I will talk about OOP in general. and not specific to any particular language though how things are done in Java will help us with the fundamentals as most OOP languages follow similar style.

I will also point out what JS does differently.

There will a review of the js `this` keyword in a separate md file.

## Contents

* [4 Principle of JS](7-a-oop-review.md#4-principle-of-js)
* [Encapsulation](7-a-oop-review.md#encapsulation)
* [Abstraction](7-a-oop-review.md#abstraction)
  * [Interfaces TS vs Java](7-a-oop-review.md#interfaces-ts-vs-java)
  * [Abstract Classes TS vs Java](7-a-oop-review.md#abstract-classes-ts-vs-java)
* [Inheritance](7-a-oop-review.md#inheritance)
  * [Java](7-a-oop-review.md#java)
  * [JS](7-a-oop-review.md#js)
* [Polymorphism](7-a-oop-review.md#polymorphism)
  * [Overloading (not possible in JS)](7-a-oop-review.md#overloading-not-possible-in-js)
  * [Overriding](7-a-oop-review.md#overriding)
  * [Overing riding in Java (final methods)](7-a-oop-review.md#overing-riding-in-java-final-methods)
* [Static Methods (Java)](7-a-oop-review.md#static-methods-java)
* [Dependancy Injections](7-a-oop-review.md#dependancy-injections)

## 4 Principle of JS

1. Encapsulation (allows Data Hiding)
2. Abstraction (idea of coupling)
3. Inheritance
4. Polymorphism (Overloading & Overriding)

## Encapsulation

Encapsulation is the concept of putting data and methods that act on that data together. Which is what `Classes` allows us to do

Encapsulation also allows for `data hiding` via getters and setters

> In JS we have the `get` and `set` keywords we can use

## Abstraction

`Abstraction` is the Idea of reducing complexity by hiding unnecessary details

1. `Coupling` is the level of dependancy between classes
2. `Less Coupling` means `Greater Abstraction`
3. We can reduce coupling my using private fields and methods
4. We can also use Interfaces and Abstract classes in languages like Java for more abstraction
5. In Java and other langs
   1. `Interface` == Class with method declarations only
   2. `Abstract Class` == Classes with empty and defined methods
   3. Empty methods are called Abstract methods
   4. Child classes MUST implement implement the abstract method

### Interfaces TS vs Java

> 1. In TS `interfaces` can be quite different
> 2. But also very similar when interfaces are implemented by a class like Java
> 3. But they `DON'T necessarily have to used exclusively with classes` unlike Java
> 4. See TS OOP notes and Interface notes for details

### Abstract Classes TS vs Java

> 1. JS has no abstract classes In TS their are abstract classes, but that are somewhat different. See TS OOP notes for details
> 2. In TS you `CAN NOT instantiate an abstract class`. Abstract class simply indicates it's a class we want to extend from later on.
> 3. So they are classes that can only be inherited from.

## Inheritance

Pretty self explanatory, when sub classes inherit properties and methods from parent class.

`Constructors` play an important role in inheritance, as they set up the object (details below).

### Java

1. In Java Constructor with `no parameters` of a base class `(Parent)` gets automatically caleed first in the derived class `(Child)`
2. But if we want to call a `prametrized` construstor of the `Parent` we need to call `super(params)`
3. `super(params)` must be the first line in the `Child` constructor
4. `private` variables and methods are not inherited by sublcasses

### JS

I have forgotten the behaviour of `super()` in JS. Need to recap

## Polymorphism

Means having many forms

In OOP this typically means methods with same names In `Parent` and `Class` behave deifferently. 2 Ways to achieve it. `Overloading` and `Overriding`

### Overloading (not possible in JS)

1. Multiple methods with `same name` but `different parameters`
2. Within the `same class`
3. Interestingly when creating Getters and Setters in TS, we can actually kinda use overloading. Both the get and set methods can have same name but different params. Getter Typically being empty. You could also name them differently like you would in Java

### Overriding

1. When method of subclass with `same signature (nmame + params)`
2. Take presedence over parent class method

### Overing riding in Java (final methods)

1. In `Java` we also annotate with `@override`
2. In `Java` when you declare a method as `final` you can not override it

## Static Methods (Java)

Static methods are accessible via classes not Objects

## Dependancy Injections

Details card and video

I find myself relying a lot less on dependancy injection js JS, due to being able to use callbacks

1. Constructor Injection
2. Setter Injection
3. Method Injection
