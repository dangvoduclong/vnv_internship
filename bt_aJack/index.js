//////////////////////////////////////////////////////// map vs forEach
// map() Tạo ra mảng mà giá trị là kết quả của hàm callback được thực hiện trên một phần tử của mảng gốc.
// Creates a new array with the transformed elements. The original array remains unchanged.

// forEach() Thực hiện một hàm callback cho các phần tử của mảng nhung khong tra ve giá trị , sd 1 tác vụ mà không cần 1 mảng mới.
// Do not change the original array and do not create a new array
// (update a value, call another function, or write a log.) -- The result of forEach is always undefined.

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

numbers.forEach((num) => console.log(num * 2));
console.log("--------------------------");

//////////////////////////////////////////////////////// find vs filter
// find() Tìm và trả về phần tử đầu tiên trong mảng mà thỏa mãn điều kiện của hàm callback.
// lặp qua các phần tử của mảng và trả về phần tử đầu tiên mà hàm callback trả về true. Sau khi tìm thấy phần tử đó, nó sẽ dừng lại và không tiếp tục lặp qua các phần tử còn lại.
// Kết quả: Trả về một phần tử duy nhất (nếu tìm thấy) hoặc undefined.
const arr = [5, 12, 8, 130, 44];
const found = arr.find((element) => element > 10);
console.log(found); // Output: 12

// filter() Tìm và trả về tất cả các phần tử trong mảng mà thỏa mãn điều kiện của hàm callback.
// lặp qua tất cả các phần tử của mảng và trả về một mảng mới chứa tất cả các phần tử mà hàm callback trả về true.
// Kết quả: Trả về một mảng mới chứa các phần tử thỏa mãn điều kiện, hoặc một mảng rỗng nếu không có phần tử nào thỏa mãn.
const filtered = arr.filter((element) => element > 10);
console.log(filtered); // Output: [12, 130, 44]
console.log("--------------------------");

//////////////////////////////////////////////////////// slice vs splice vs split
// slice() return a shallow copy of a portion(1phần) of an array into a new array object selected from start to end (end not included). arr || string
// where start and end represent(biểu thị) the index of items in that array. The original array will not be modified.
/*  
read from start --->

   0     1     2     3     4
|     |     |     |     |     |
|  S  |  L  |  I  |  C  |  E  |
|     |     |     |     |     |
  -5    -4    -3    -2    -1

<--- read from reverse
*/
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

const str = "Hello, world!";
const slicedString = str.slice(7, 12);
console.log(slicedString); // Output: "world"
// Using slice, create newCar from myCar.
const myHonda = {
  color: "red",
  wheels: 4,
  engine: { cylinders: 4, size: 2.2 },
};
const myCar = [myHonda, 2, "cherry condition", "purchased 1997"];
const newCar = myCar.slice(0, 2);

console.log("myCar =", myCar);
console.log("newCar =", newCar); // [ { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } }, 2 ]
console.log("myCar[0].color =", myCar[0].color); // red
console.log("newCar[0].color =", newCar[0].color); // red
// Change the color of myHonda.
myHonda.color = "purple";
console.log("The new color of my Honda is", myHonda.color);
console.log("myCar[0].color =", myCar[0].color); // purple
console.log("newCar[0].color =", newCar[0].color); // purple

const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 33, // ignored by slice() since length is 3
};
console.log(Array.prototype.slice.call(arrayLike, 1, 3));
// [ 3, 4 ]
console.log("--------------------------");

// splice() method of Array: thay đổi nội dung của một mảng bằng cách loại bỏ hoặc thay thế các phần tử hiện có và/hoặc thêm các phần tử mới vào vị trí.
// Để tạo một mảng mới với một phân đoạn được loại bỏ và/hoặc thay thế mà không làm thay đổi mảng ban đầu, hãy sử dụng toSpliced().
//thay đổi mảng ban đầu, trả về mảng chứa các phần tử để xóa
/*
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2)
splice(start, deleteCount, item1, item2, /* …, * itemN)

*/
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

// Remove 0 (zero) elements before index 2, and insert "drum"
const myFish = ["angel", "clown", "mandarin", "sturgeon"];
const removed = myFish.splice(2, 0, "drum");
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
// removed is [], no elements removed

const removedd = myFish.splice(0, 2, "parrot", "anemone", "blue");
// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// removed is ["angel", "clown"]

const arrayLikee = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
};
console.log(Array.prototype.splice.call(arrayLike, 0, 1, 2, 3));
// [ 5 ]
console.log(arrayLike);
// { '0': 2, '1': 3, '3': 4, length: 4, unrelated: 'foo' }

// split() method of String Tách chuỗi thành một mảng các chuỗi con. Không thay đổi chuỗi gốc; trả về một mảng mới chứa các chuỗi con.
const str2 = "The quick brown fox jumps over the lazy dog.";

const words = str2.split(" ");
console.log(words[3]); // Expected output: "fox"

const chars = str2.split("");
console.log(chars[8]); // Expected output: "k"

const strCopy = str2.split();
console.log(strCopy); // Expected output: Array ["The quick brown fox jumps over the lazy dog."]
strCopy.splice(0, 2);
console.log(strCopy); // Expected output: Array []
console.log(str2); // Expected output: "The quick brown fox jumps over the lazy dog."

const names = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ";

console.log(names);

const re = /\s*(?:;|$)\s*/;
const nameList = names.split(re);

console.log(nameList);

/*
string.split(separator, limit);

split(" "): Chia chuỗi thành mảng các từ dựa trên dấu cách.
split(""): Chia chuỗi thành mảng các ký tự.
split(): Chia chuỗi thành mảng một phần tử chứa toàn bộ chuỗi gốc.
splice(0, 1): Xóa phần tử tại chỉ mục 0 trong mảng và làm thay đổi mảng gốc.

"How are you doing today?".split(" ", 3)
(3) ["How", "are", "you"]

*/

/*
Slice() :
Không thay đổi mảng gốc
Trả về kết quả là 1 mảng mới
Có thể sử dụng cho cả mảng và chuỗi (string)
Splice() :
Dùng cho việc thêm, xóa phần tử trong mảng
Trả về mảng là những phần tử bị xóa (trong trường hợp xóa phần tử trong mảng)
Thay đổi trực mảng gốc
Chỉ dùng cho mảng
Cú pháp thêm phần tử: array.splice (index, number of elements, element)
Cú pháp xóa phần tử: array.splice (index, number of elements)
Split() :
Chia 1 chuỗi thành các chuỗi con
Trả về là 1 mảng
Không làm thay đổi chuỗi gốc
Chỉ dùng cho String
Lấy vào 2 đối số (có thể không bắt buộc) : string.split(separator, limit)
*/
