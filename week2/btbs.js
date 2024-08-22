// reference values array
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits);

const fruits3 = fruits.slice();
console.log(fruits3);

const fruits2 = fruits.splice(2, 2, "Lemon", "Kiwi");
console.log(fruits2);

const fruits4 = [...fruits];
console.log(fruits4);

console.log(fruits);

const modifyArr = (arr) => {
  arr[0] = "Peanuts";
  arr[3] = "Pineapple";
  console.log(arr);
};
modifyArr(fruits);
console.log(fruits);

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = array1.concat(array2);

array1.push(...array2);

console.log("Combined Array:", combinedArray);
console.log("Modified Array 1:", array1);
console.log("Array 1:", array1);
console.log("Array 2:", array2);

// nested obj && arr
const obj = {
  name: "John",
  age: 30,
  cars: [
    { model: "BMW", year: 2010 },
    { model: "Ford", year: 2012 },
  ],
};

console.log(obj.cars[1].model);
obj.cars.push({ model: "Porsche", year: 2015 });
console.log(obj);

const students = [
  {
    name: "Alice",
    grades: [90, 85, 88],
  },
  {
    name: "Bob",
    grades: [70, 75, 80],
  },
  {
    name: "Charlie",
    grades: [95, 92, 89],
  },
];

console.log(students[0].name);
console.log(students[1].grades[2]);

students[2].grades.push(90);
console.log(students[2].grades);

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(matrix[1][2]);
matrix[1][2] = 10;
console.log(matrix);

// function return obj
function getUserInfo(user) {
  return {
    name: user.name,
    age: user.age,
  };
}

const user = { name: "John", age: 30 };
const message = `User info: Name - ${getUserInfo(user).name}, Age - ${
  getUserInfo(user).age
}`;

console.log(message);

//function return boolean
const isEven = (num) => num % 2 === 0;
const num = 10;
const mess = `${num} is ${isEven(num) ? "even" : "odd"}`;
console.log(mess);

// Logical operators
const a = 5;
const b = 10;
const c = 15;
const result = a < b && b < c;
console.log(result);

const d = null;
const e = 10;

console.log(d ?? e); // Kết quả: 10 (vì d là null)
console.log(0 ?? e); // Kết quả: 0 (vì 0 không phải là null hoặc undefined)

// logical assignment
let x = true;
x &&= false; // x = x && false -> x = false

let y = true;
y &&= true; // y = y && true -> y = true

let m = null;
m ||= "default"; // m = m || 'default' -> m = 'default'

let n = "value";
n ||= "default"; // n = n || 'default' -> n = 'value' (vì y đã là truthy)

let j = null;
j ??= "default"; // j = j ?? 'default' -> j = 'default'

let k = "value";
k ??= "default"; // k = k ?? 'default' -> k = 'value' (vì k không phải là null hoặc undefined)

let aa = null;
let bb = true;
let cc = false;

a ||= "default"; // a = 'default'
b &&= c; // b = b && c -> b = false
c ??= "value"; // c = c ?? 'value' -> c = 'value'

/////////////////////////////////////// ARROW FUNCTIONS
// no 'this' -- no 'arguments' -- no 'new' -- no 'super'  -- no 'target'
const square = (x) => x * x;
const add = (a, b) => a + b;
const logMessage = (message) => {
  console.log(message);
};

function showArguments() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
showArguments("A", "B", "C");
// const showArguments = () => {
//     for (let i = 0; i < arguments.length; i++) {
//         console.log(arguments[i]);
//     }
// }// ReferenceError: arguments is not defined

const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // `this` tham chiếu đến đối tượng person
    }, 1000);
  },
};

person.greet(); // "Hello, Alice"

////////////////////////////////////// HOF (Higher-Order Function)
//1.Nhận một hàm khác làm đối số: Hàm này có thể nhận một hoặc nhiều hàm như là tham số đầu vào.
// 2.Trả về một hàm: Hàm này có thể trả về một hàm mới.

// Hàm Higher-Order Function nhận một hàm làm đối số
function applyFunction(arr, func) {
  return arr.map(func);
}

// Hàm callback được truyền vào applyFunction
function double(x) {
  return x * 2;
}

const numbers = [1, 2, 3, 4];
const doubledNumbers = applyFunction(numbers, double);

console.log(doubledNumbers); // [2, 4, 6, 8]

const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10

const firstEven = numbers.find((num) => num % 2 === 0);
console.log(firstEven); // 2

const result1 = numbers
  .filter((num) => num % 2 === 0) // Lọc các số chẵn
  .map((num) => num * 2) // Nhân đôi các số
  .reduce((sum, num) => sum + num, 0); // Tính tổng

console.log(result); // 12 (2*2 + 4*2)

const objj = {
  name: "Alice",
  greet() {
    console.log(`Hello, ${this.name}!`);
  },
};
const greet = obj.greet.bind({ name: "Bob" });
greet(); // Hello, Bob!

function compose(...fns) {
  return function (initialValue) {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;

const combinedFunction = compose(multiply2, add1);
console.log(combinedFunction(5)); // 12 (5 + 1 = 6, 6 * 2 = 12)

////////////////////////////////////// THIS
function regularFunction() {
  console.log(this);
}

const obj2 = {
  name: "John",
  regularFunction: regularFunction,
};

obj.regularFunction(); // `this` là `obj`, in ra: { name: 'John', regularFunction: [Function: regularFunction] }

regularFunction(); // `this` là `global` (Node.js) hoặc `window` (trình duyệt)

const obj3 = {
  name: "John",
  regularFunction: function () {
    console.log(this.name); // `this` ở đây tham chiếu đến `obj`, in ra: John
  },
  arrowFunction: () => {
    console.log(this.name); // `this` ở đây tham chiếu đến phạm vi bao quanh của `obj`, có thể là `global` hoặc `undefined`
  },
};

obj.regularFunction(); // Kết quả: John
obj.arrowFunction(); // Kết quả: undefined (hoặc lỗi, tùy thuộc vào chế độ strict mode)

///////////////////////////////////// DOM

// Selecting elements
const element = document.getElementById("id");
const elements = document.getElementsByClassName("element");
const elements2 = document.getElementsByTagName("element");
const element2 = document.querySelector(".element");
const element3 = document.querySelectorAll(".element");

// modifying content
element.textContent = "Hello World";
element.innerText = "Hello World";
element.innerHTML = "<b>Hello World</b>";

// modifying attributes
element.setAttribute("class", "new-class");
element.removeAttribute("class");

// modifying styles
element.style.color = "red";
element.style.backgroundColor = "green";

// creating elements
const newElement = document.createElement("div");
newElement.textContent = "New Element";
document.body.appendChild(newElement);

// removing elements
document.body.removeChild(newElement);

// adding classes
element.classList.add("new-class");
element.classList.remove("new-class");

/*
<div id="myDiv">
    <p>Đây là một đoạn văn.</p>
</div>
const div = document.getElementById('myDiv');
console.log(div.outerHTML); // Kết quả: '<div id="myDiv"><p>Đây là một đoạn văn.</p></div>'

div.outerHTML = '<section><h1>Nội dung mới!</h1></section>'; // Thay thế phần tử <div> và nội dung bên trong bằng HTML mới
*/

// handling events

element.removeEventListener("click", () => {
  console.log("Clicked!");
});

element.document.getElementById("id").addEventListener("click", () => {
  console.log("Clicked!");
});

// change content when button is clicked
const button = document.querySelector("button");
button.addEventListener("click", () => {
  const para = document.querySelector("#mypara");
  para.textContent = "Hello, World!";
});

// event clicked to process form
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  console.log(`Name: ${name}, Email: ${email}`);
});

const element = document.querySelector(".element");
element.addEventListener("mouseover", () => {
  element.style.backgroundColor = "green";
});
element.addEventListener("mouseout", () => {
  element.style.backgroundColor = "blue";
});
