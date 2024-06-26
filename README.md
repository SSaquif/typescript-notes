# Typescript Notes

Notes Based on [Todd Motto's TS courses](https://ultimatecourses.com/courses/typescript)

The course uses a older verion of TS, `2.6.2`

Since this is just basic notes, I wont update the project to the latest version (as of present latest version is `4.3.4` ) unless necessary

## Contents

#### Basics

1. JS Basics Review
2. General Notes (TS compiler and setup)
3. ES6/7 Features (skipped)
4. Primitive Types
5. Typescript Types
6. Type Aliases and Assertions
7. Typescript Interfaces
8.  Class, Properties and Inheritance

    A. OOP General Overview (not JS specific)

    B. OOP with TS

    C. `this` refresher (skipped)

    D. Typing `this` in TS

#### Advanced

8. Type Queries
9. Mapped Types
10. Type Guards
11. Advanced Types & Practices
12. Generics & Overloads
13. Enums
14. Declaration Files
15. tsconfig & Compiler Options

## File Structure

Notes in `notes` folder

Actual Runnable Code in the `typescript-starter-project` folder

## Running Code & Quick Notes

1. Look at the TS compiler section in the `intro.md` file for details
2. run `tsc -watch` and then run the js files created in the dist folders using `node` like always for testing
3. You cant reuse variable names in different files unless you use module system (see below)
4. Modules are a way to create a local scope in the file. So, all variables, classes, functions, etc. that are declared in a module are not accessible outside the module
5. An module can be created using the keyword export and a module can be used in another module using the keyword import
6. For this reason most files have at least 1 export in them. Even if they are never being imported

## Resources

* [TypeScript Docs](https://www.typescriptlang.org)
* [TypeScript Playground](https://www.typescriptlang.org/play)
* [AST Explorer](https://astexplorer.net)
