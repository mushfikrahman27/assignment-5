 1️. What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript.

The main difference is how they behave.

var is the old way to declare variables. It is function-scoped and can be redeclared and updated.

let is block-scoped and it can be updated but cannot be redeclared in the same scope.

const is also block-scoped but its value cannot be changed after it is assigned.

So in modern JavaScript, developers mostly use let and const instead of var.


2️. What is the spread operator (...)?

The spread operator (...) is used to expand elements of an array or properties of an object.

It helps to copy or combine arrays and objects easily.

Example:

const arr1 = [1,2,3];
const arr2 = [...arr1,4,5];

Here the spread operator copies the elements of arr1 into arr2.


3️. What is the difference between map(), filter(), and forEach()?

These three methods are used to work with arrays.

map() creates a new array by applying a function to every element.

filter() creates a new array with elements that match a condition.

forEach() just loops through the array and performs an action, but it does not return a new array.

So the main difference is that map and filter return new arrays, but forEach does not.


4️. What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript.

It uses the => symbol.

Example:

const add = (a,b) => a + b;

Arrow functions make the code shorter and easier to read.



5️. What are template literals?

Template literals are a way to create strings in JavaScript using backticks ( ` ).

They allow us to insert variables inside a string easily using ${}.

Example:

const name = "John";
const text = `Hello ${name}`;

This makes it easier to combine variables and text.