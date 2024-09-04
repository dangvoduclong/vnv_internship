const add = (a) => (b) => (c) => a + b + c;
console.log(add(1)(2)(3));
const multiply = (a) => (b) => a * b;
console.log(multiply(2)(add(5)(3)(6)));

const greet =
  (greeting = "Hello") =>
  (name = "World") =>
    `${greeting}, ${name}!`;

const greetHello = greet();
console.log(greetHello("Alice")); // "Hello, Alice!"

const greetHi = greet("Hi");
console.log(greetHi("Bob")); // "Hi, Bob!"

const createUser = (name) => (age) => (email) => ({ name, age, email });

const userWithName = createUser("John");
const userWithAge = userWithName(30);
const user = userWithAge("john.doe@example.com");

console.log(user); // { name: 'John', age: 30, email: 'john.doe@example.com' }
