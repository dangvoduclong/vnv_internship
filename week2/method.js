////////////////////////////////////////////////////////////////// STRING METHOD
let text = "Hello World     ";

console.log(text.toLowerCase()); // Output: "hello world"
console.log(text.toUpperCase()); // Output: "HELLO WORLD"
console.log(text.trim());
console.log(text.includes("World")); // Output: true
console.log(text.includes("world")); // Output: false
console.log(text.replace("World", "Everyone")); // Output: "Hello Everyone"
console.log(text.split(" ")); // Output: ["Hello", "World"]
console.log(text.substring(0, 5)); // Output: "Hello"      trich xuat 1 phan cua chuoi begin -> end
console.log(text.slice(-5)); // Output: "World"
console.log(text.charAt(1)); // Output: "e"
////////////////////////////////////////////////////////////////////////////////// ARRAY METHOD

// Phương thức flat() được sử dụng để làm phẳng nested arrays (default 1)
let nestedArray = [1, [2, [3, [4]]]];
console.log(nestedArray.flat()); // Output: [1, 2, [3, [4]]]
console.log(nestedArray.flat(2)); // Output: [1, 2, 3, [4]]
console.log(nestedArray.flat(Infinity)); // Output: [1, 2, 3, 4]

// flatMap()        array.flatMap(callback(currentValue[, index[, array]])[, thisArg])
let array = [1, 2, 3, 4];

let result = array.flatMap((x) => [x, x * 2]);
console.log(result); // Output: [1, 2, 2, 4, 3, 6, 4, 8]

let nestedArray1 = [1, 2, 3];
let result1 = nestedArray1.flatMap((x) => [
  [x, x * 2],
  [x * 3, x * 4],
]);

console.log(result1); // Output: [ [ 1, 2 ], [ 3, 4 ], [ 2, 4 ], [ 6, 8 ], [ 3, 6 ], [ 9, 12 ] ]
let flattenedResult = result1.flat(2);
console.log(flattenedResult);

// forEach() Thực hiện một hàm callback cho từng phần tử của mảng
let numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num));

// map() Tạo ra một mảng mới với các giá trị là kết quả của hàm callback được thực hiện trên mỗi phần tử của mảng gốc.
let squares = numbers.map((num) => num * num);
console.log(squares); // Output: [1, 4, 9, 16, 25]

//filter() Tạo ra một mảng mới chỉ chứa các phần tử mà hàm callback trả về giá trị true
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

//reduce() Áp dụng một hàm callback cho từng phần tử của mảng (từ trái sang phải) để thu gọn mảng thành một giá trị đơn
const reducer = (accumulator, currentValue, currentIndex) => {
  const returns = accumulator + currentValue;

  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, currentIndex: ${currentIndex}, returns: ${returns}`
  );
  return returns; // Output: 15
};
numbers.reduce(reducer, 0);

// find() Tìm và trả về phần tử đầu tiên trong mảng mà hàm callback trả về giá trị true. Nếu không tìm thấy, trả về undefined.
let found = numbers.find((num) => num > 3);
console.log(found); // Output: 4

// includes() Kiểm tra xem mảng có chứa một giá trị cụ thể hay không.
let hasThree = numbers.includes(3);
console.log(hasThree); // Output: true

// reverse()  Đảo ngược thứ tự các phần tử trong mảng
numbers.reverse();
console.log(numbers); // Output: [5, 4, 3, 2, 1]

// slice() Tạo ra một mảng con từ mảng gốc, bắt đầu từ chỉ số begin đến chỉ số end (không bao gồm end).
let sliced = numbers.slice(2, 4);
console.log(sliced); // Output: [3, 4]

// join() Nối các phần tử của mảng thành một chuỗi, sử dụng ký tự phân tách.
let joined = numbers.join("-");
console.log(joined); // Output: 1-2-3-4-5

// entries() phiên bản Array trả về một đối tượng lặp mảng mới chứa các cặp khóa/giá trị cho mỗi chỉ mục trong mảng.
for (const [index, value] of numbers.entries()) {
  console.log(index, value);
} // Output: 0 1, 1 2, 2 3, 3 4, 4 5

// fill() điền giá trị vào các phần tử của mảng array.fill(value, start, end)           thay đổi mảng gốc

//////////////////////////////////////////////////////////////// OBJECT METHOD
