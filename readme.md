# Typescript Notes

Notes Based on Todd Motto's TS course

The course uses a older verion of TS `2.6.2`, as of present I have `4.3.4` on my computer

Since this is just basic notes, I wont update the project to the latest version (for now at least)

## Contents

0. JS Basics Review

1. General Notes (TS compiler and setup)

2. ES6/7 Features (skipped)

3. Primitive Types

4. Typescript Types

5. Type Aliases and Assertions

6. Typescript Interfaces

7. Class, Properties and Inheritance

## File Structure

WIP

Notes in notes folder

Actual runnable code in the starter project folder

## How it works

1. Look at the TS compiler section in `intro.md` for details

2. run `tsc -watch` and then run the js files created in the dist folders using `node` like always for testing

3. You cant reuse variable names in different files unless you use module system (see below)

4. Modules are a way to create a local scope in the file. So, all variables, classes, functions, etc. that are declared in a module are not accessible outside the module.

5. A module can be created using the keyword export and a module can be used in another module using the keyword import.

## Resources

- [TypeScript Docs](https://www.typescriptlang.org)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [AST Explorer](https://astexplorer.net)
