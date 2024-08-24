// let
let x = 10;
if (true) {
  let x = 20; // Biến x trong phạm vi khối
  console.log(x); // 20
}
console.log(x); // 10

// const
const PI = 3.14;
// PI = 3.1415; // Sẽ báo lỗi vì không thể gán giá trị mới cho PI

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Arrow function với nhiều dòng
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log(multiply(2, 3)); // 6

// Template Literals:
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, Alice!

const multiline = `This is
a string
that spans
multiple lines.`;
console.log(multiline);

// Destructuring từ mảng
const [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

// Destructuring từ đối tượng
const person = { name: "Bob", age: 30 };
const { name, age } = person;
console.log(name); // Bob
console.log(age); // 30

// Default parameter
function greet(name, greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}
greet("Alice"); // Hello, Alice!
greet("Alice", "Hi"); // Hi, Alice!

// Rest Parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // { a: 1, b: 2, c: 3 }

const x = 10;
const y = 20;

const obj = {
  x,
  y,
  method() {
    return this.x + this.y;
  },
};
console.log(obj.method()); // 30

// module.js
export const pi = 3.14;
export function sum(a, b) {
  return a + b;
}

// main.js
import { pi, sum } from "./module.js";
console.log(pi); // 3.14
console.log(sum(2, 3)); // 5

// promises
function asyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Task complete");
    }, 1000);
  });
}

asyncTask()
  .then((result) => {
    console.log(result); // Task complete
  })
  .catch((error) => {
    console.error(error);
  });

// Symbol
const uniqueSymbol = Symbol("description");
const obj = {
  [uniqueSymbol]: "value",
};
console.log(obj[uniqueSymbol]); // value

// Map
const map = new Map();
map.set("key", "value");
console.log(map.get("key")); // value

// Set
const set = new Set([1, 2, 3]);
set.add(4);
console.log(set.has(3)); // true
console.log(set.has(5)); // false

// Es 7 2016
console.log(2 ** 3); // 8 (2 mũ 3)

const arr = [1, 2, 3, 4];
console.log(arr.includes(2)); // true
console.log(arr.includes(5)); // false

// Es 8 2017
// Hàm bất đồng bộ
async function fetchData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await response.json();
  return data;
}

// Sử dụng hàm bất đồng bộ
fetchData().then((data) => {
  console.log(data);
});

const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]
console.log(Object.values(obj)); // [1, 2, 3]

// string.padStart(length, string)
const str = "5";
console.log(str.padStart(2, "0")); // '05'
console.log(str.padEnd(3, "0")); // '500'

// Es 9 2018
// Asynchronous Iteration:
async function* asyncGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

(async () => {
  for await (let value of asyncGenerator()) {
    console.log(value); // 1, 2, 3
  }
})();

// rest parameters
const obj = { a: 1, b: 2, c: 3 };
const { a, ...rest } = obj;
console.log(a); // 1
console.log(rest); // { b: 2, c: 3 }
// spread operator
const newObj = { ...obj, d: 4 };
console.log(newObj); // { a: 1, b: 2, c: 3, d: 4 }

// Es 10 2019
const arr = [1, [2, [3, 4]]];
console.log(arr.flat()); // [1, 2, [3, 4]]
console.log(arr.flat(2)); // [1, 2, 3, 4]

const arr2 = [1, 2, 3];
console.log(arr2.flatMap((x) => [x, x * 2])); // [1, 2, 2, 4, 3, 6]

const entries = [
  ["a", 1],
  ["b", 2],
];
const obj = Object.fromEntries(entries);
console.log(obj); // { a: 1, b: 2 } Chuyển đổi một mảng các cặp [key, value] thành đối tượng.

const str = "  Hello World!  ";
console.log(str.trimStart()); // 'Hello World!  '
console.log(str.trimEnd()); // '  Hello World!'

// Es 11 2020
// Nullish Coalescing Operator (??):
const foo = null ?? "default";
const bar = 0 ?? 42;
console.log(foo); // 'default'
console.log(bar); // 0

// Optional Chaining (?.):
const person = { name: "Alice", address: { city: "Wonderland" } };
console.log(person.address?.city); // Wonderland
console.log(person.phone?.number); // undefined

// BigInt: loại số nguyên lớn hơn Number.
const bigIntValue = 9007199254740991n; // BigInt literal
const bigIntSum = bigIntValue + 1n;
console.log(bigIntSum); // 9007199254740992n

// Promise.allSettled(): Trả về một Promise đã được giao cho tất cả các Promise đã được đặt. bất kể chúng thành công hay thất bại.
const promise1 = Promise.resolve(3);
const promise2 = Promise.reject("error");

Promise.allSettled([promise1, promise2]).then((results) => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 3 },
  //   { status: 'rejected', reason: 'error' }
  // ]
});

// Es 12 2021
// Logical Assignment Operators:
let a = true;
a &&= false;
console.log(a); // false

let b = null;
b ??= "default";
console.log(b); // 'default'

// Numeric Separators:
const largeNumber = 1_000_000_000;
console.log(largeNumber); // 1000000000

const hex = 0xff_ff_ff;
console.log(hex); // 16777215

const str = "Hello world! Hello everyone!";
console.log(str.replaceAll("Hello", "Hi")); // 'Hi world! Hi everyone!'

// weakRef
let obj = { name: "Test" };
const weakRef = new WeakRef(obj);

// Giả sử obj sẽ bị GC
obj = null;

// Lấy đối tượng nếu vẫn còn tồn tại
const deref = weakRef.deref();
console.log(deref); // undefined (hoặc { name: 'Test' } nếu chưa bị GC)
