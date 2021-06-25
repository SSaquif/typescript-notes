# Primitive Types

1. JS Number() and TS numbner are not the same, same goes for other constructor. (We will see the difference later)

2. By default , variables in in ts files are assigned a type once they are first assigned a value

3. It's not possible to change the type later

   ```typescript
   let cost = 20; // Cost = number

   cost = `30`; //error
   ```

4. When we are in strict mode, variables are NOT of `any` type by default, so all variables including function parameters must have a type explicitly given to it
