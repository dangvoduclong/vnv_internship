///////////////////////////////////////////////////////////////////////////////// ARRAY METHODS
const arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const words = ["hello", "world", "javascript", "map"];
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 40 },
];
const matrix = [
  [1, [2, [3]]],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("----------------------------- MAP -----------------------------");

console.log("cau 1--------------------------------------------");
const doubledNum = arrNum.map((num) => num * 2);
console.log(doubledNum);
console.log("-------------------------------------------------");

console.log("cau 2--------------------------------------------");
const upperW = words.map((word) => word.toUpperCase());
console.log(upperW);
console.log("-------------------------------------------------");

console.log("cau 3--------------------------------------------");
const squareNum = arrNum.map((num) => num ** 2);
console.log(squareNum);
console.log("-------------------------------------------------");

console.log("cau 4--------------------------------------------");
const newArrKeyPeo = people.map((peo) => peo.name);
console.log(newArrKeyPeo);
console.log("-------------------------------------------------");

console.log("cau 5--------------------------------------------");
const newArrChange = arrNum.map((num) => `$${num}`);
console.log(newArrChange);
const sumNewArrChange = newArrChange
  .map((str) => Number(str.split("$").join("")))
  .reduce((acc, cur) => acc + cur, 0);
console.log(sumNewArrChange);
console.log("-------------------------------------------------");

console.log("cau 6--------------------------------------------");
const structuralChange = people.map((peo) => {
  return {
    name: peo.name,
    salary: `$${(peo.age * 1000).toLocaleString()}`,
  };
});
console.log(structuralChange);
console.log("-------------------------------------------------");

console.log("cau 7--------------------------------------------");
const changeMatrix = matrix.flatMap((num) => num);
console.log(changeMatrix);
console.log(changeMatrix.flat(Infinity));
console.log("-------------------------------------------------");

console.log("cau 8--------------------------------------------");
const dates = ["2023-12-01", "2023-02-01", "2023-10-01"];
const formatDate = dates.map((date) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
});
console.log(formatDate);
console.log("-------------------------------------------------");

console.log("cau 9 Map + filter-------------------------------");
const Adult = people.filter((f) => f.age > 30).map((peo) => peo.name);
console.log(Adult);
console.log("-------------------------------------------------");

const students = [
  { name: "Alice", grades: [85, 90, 92] },
  { name: "Bob", grades: [78, 82, 88] },
  { name: "Charlie", grades: [90, 95, 100] },
];
console.log("cau 10-------------------------------------------");
const average = students.map((std) => {
  const avg = std.grades.reduce((acc, cur) => acc + cur, 0) / std.grades.length;
  return { name: std.name, avg: avg };
});
console.log(average);
console.log("-------------------------------------------------");

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 400 },
];
console.log("cau 11-------------------------------------------");
const newProduct = products.map((p) => {
  return {
    name: p.name,
    newPrice: `$${p.price}`,
  };
});
console.log(newProduct);
console.log("-------------------------------------------------");

const cart = [
  { name: "Apple", quantity: 3, price: 1.5 },
  { name: "Banana", quantity: 2, price: 1.2 },
  { name: "Cherry", quantity: 5, price: 2.0 },
];
console.log("cau 12-------------------------------------------");
const totalValue = cart.map((c) => {
  return {
    name: c.name,
    payment: c.price * c.quantity,
  };
});
const totalValueCart = totalValue.reduce((acc, cur) => acc + cur.payment, 0);
console.log(totalValue);
console.log("Total amount to be paid: " + totalValueCart);
console.log("-------------------------------------------------");

console.log("cau 13-------------------------------------------");
const apiData = [
  { id: 1, name: "Laptop", price: "1200.00" },
  { id: 2, name: "Phone", price: "800.00" },
  { id: 3, name: "Tablet", price: "400.00" },
];
const newData = apiData.map((data) => {
  return {
    name: data.name,
    price: Number(data.price),
  };
});
console.log(newData);
console.log("-------------------------------------------------");

console.log("---------------------------- REDUCE ----------------------------");

console.log("cau 1--------------------------------------------");
const numbers = [10, -5, 20, -15, 30];
const sumPositive = numbers.reduce(
  (acc, cur) => (cur > 0 ? acc + cur : acc),
  0
);
console.log(sumPositive);
console.log("-------------------------------------------------");

console.log("cau 2--------------------------------------------");
const string = "Hello world";
const countChar = string
  .replace(/\s+/g, "")
  .split("")
  .reduce((acc, cur) => {
    acc[cur] ? acc[cur]++ : (acc[cur] = 1);
    return acc;
  }, {});
console.log(countChar);
console.log("-------------------------------------------------");

const items = [
  { category: "Electronics", value: 100 },
  { category: "Furniture", value: 200 },
  { category: "Electronics", value: 150 },
  { category: "Furniture", value: 300 },
  { category: "Clothing", value: 50 },
];
console.log("cau 3--------------------------------------------");
const aggregateByCategory = items.reduce((acc, cur) => {
  acc[cur.category]
    ? (acc[cur.category] += cur.value)
    : (acc[cur.category] = cur.value);
  return acc;
}, {});
console.log(aggregateByCategory);
console.log("-------------------------------------------------");

const numberss = [5, 10, 15, 20, 25];
console.log("cau 4--------------------------------------------");
const avgArr = numberss.reduce((acc, cur) => acc + cur, 0) / numberss.length;
console.log(avgArr);
console.log("-------------------------------------------------");

console.log("cau 5--------------------------------------------");
const keys = ["name", "age", "city"];
const values = ["Alice", 30, "New York"];
const newObj = keys.reduce((obj, key, index) => {
  obj[key] = values[index];
  return obj;
}, {});
console.log(newObj);
console.log("-------------------------------------------------");

console.log("cau 6--------------------------------------------");
const arrayOfArrays = [
  [1, 2, 3],
  [4, 5, 6],
  [1, 6, 7],
];
const uniqueValues = arrayOfArrays
  .reduce((acc, arr) => acc.concat(arr), [])
  .reduce((acc, val) => (acc.includes(val) ? acc : acc.concat(val)), []);
console.log(uniqueValues);
console.log("-------------------------------------------------");

console.log("cau 7--------------------------------------------");
const data = [
  { group: "A", value: 10 },
  { group: "B", value: 20 },
  { group: "A", value: 30 },
  { group: "C", value: 40 },
  { group: "B", value: 50 },
];
const groupData = data.reduce((acc, cur) => {
  acc[cur.group] ? (acc[cur.group] += cur.value) : (acc[cur.group] = cur.value);
  return acc;
}, {});
console.log(groupData);

console.log(
  "----------------------------- FOR EACH -----------------------------"
);
console.log("cau 1--------------------------------------------");
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];
users.forEach((p) => (p.Adult = p.age > 18));
console.log(users);
console.log("-------------------------------------------------");

console.log("cau 2--------------------------------------------");
const uppercaseMessages = [];
words.forEach((mess) => uppercaseMessages.push(mess.toLocaleUpperCase()));
console.log(uppercaseMessages);
console.log("-------------------------------------------------");

console.log("cau 3--------------------------------------------");
const number3 = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [];
number3.forEach((num) =>
  !uniqueNumbers.includes(num) ? uniqueNumbers.push(num) : uniqueNumbers
);
console.log(uniqueNumbers);
console.log("-------------------------------------------------");

console.log("cau 4--------------------------------------------");
number3.forEach((num) =>
  console.log(num + (num % 2 === 0 ? " is even" : " is odd"))
);
console.log("-------------------------------------------------");

console.log("cau 5--------------------------------------------");
const resultObject = {};
apiData.forEach((item) => {
  resultObject[item.id] = { name: item.name, price: item.price };
});
console.log(resultObject);
console.log("-------------------------------------------------");

console.log("cau 6--------------------------------------------");
const student2 = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 },
];
student2.forEach((std) => {
  std.score >= 90
    ? console.log(`${std.name} Excellent`)
    : std.score >= 70
    ? console.log(`${std.name} Good`)
    : console.log(`${std.name} Needs Improvement`);
});
console.log("-------------------------------------------------");
