# General Notes

## Intro

1. TypeScript does not run in the Browser. So a compilation step in the build process is need.

2. Technically it is possible using tools but not recommended in production.

3. When using TS with Angular/React, the TS is compiled to JS during the buld process into one big JS file (a bundle).

4. Which may Ocassionally pull in other bundles lazily.

## Typescript Compiler

1. We need a typescript compiler to convert the ts to js.

2. The compiler can decide what version of js to compilet to ES5/6/7

3. ![TS-vs-JS](../0a-utils/images/ts-vs-js.png)

4. We can use the typescript compiler outside of webpact. By having it installed globally.

   ```bash
   npm i -g typescript
   yarn add global typescript
   ```

5. Can also use it locally by having it as a dependancy in our projects

## Installing TS Compilers

1. In the package.json file there is a `start script which calls our webpack-dev-server`

2. We need to setup this webpack dev server, most modern libraries/frameworks has tools to take care of this tep for us

3. For example with create-react-app we add the typescript options while creating the project etc

4. As seen in the `package.json file` we need the following dev dependecies and start script

   ```json
   {
     "scripts": {
       "start": "webpack-dev-server",
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "devDependencies": {
       "awesome-typescript-loader": "3.4.1",
       "typescript": "2.6.2",
       "webpack": "3.10.0",
       "webpack-dev-server": "2.9.7"
     }
   }
   ```

## TypeScript Compiler (tsc) and tsconfig

1. Running the TS compiler from terminal

   ```bash
   # will bring up the help menu with examples and options
   tsc
   # version
   tsc -version
   # running a single file
   tsc hello.ts
   # initialing a ts project and generating the tsconfig file
   # The file will have most stuff commented out
   # but u can always generate this and see possible configurations
   tsc --init
   ```

2. Once we have the tscongif file we can just run `tsc` on command line and project will be built and js files will be produced

3. but our initial html has the script as follows (see below), so we need to generate our js files inside a `/dist` directory

   ```html
   <script src="dist/app.js"></script>
   ```

4. To specify an output directory named dist we run the following

   ```bash
   tsc --outDir dist
   ```

5. But instead of having to do that manually we simply update our tsconfig file by adding, now we can once again just run `tsc` to build it

   ```json
   {
     "compilerOptions"{
     <!-- other properties -->
     "outDir": "dist"
     }
   }
   ```

6. Finally we want to enable watch mode, so the js files are auto updated when we change our ts files. To do so run the following and your terminal will now be running the tsc cli tool which will notify you of updates.

```bash
# running tsc with the watch option
tsc -watch
```

## Setting up Webpack for TypeScript

1. It's a good idea to have a local server where we can live reload our TS web apps

2. This is where Webpack dev server comes in

## Resources
