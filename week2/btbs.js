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
}
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
    name: 'John',
    age: 30,
    cars: [
        { model: 'BMW', year: 2010 },
        { model: 'Ford', year: 2012 }
    ]
}

console.log(obj.cars[1].model);
obj.cars.push({ model: 'Porsche', year: 2015 });
console.log(obj);

const students = [
    {
        name: 'Alice',
        grades: [90, 85, 88]
    },
    {
        name: 'Bob',
        grades: [70, 75, 80]
    },
    {
        name: 'Charlie',
        grades: [95, 92, 89]
    }
];

console.log(students[0].name);
console.log(students[1].grades[2]);


students[2].grades.push(90);
console.log(students[2].grades);

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]]

console.log(matrix[1][2]);
matrix[1][2] = 10;
console.log(matrix);


// function return obj
function getUserInfo(user) {
    return {
        name: user.name,
        age: user.age
    };
}

const user = { name: 'John', age: 30 };
const message = `User info: Name - ${getUserInfo(user).name}, Age - ${getUserInfo(user).age}`;

console.log(message); 


//function return boolean
const isEven = (num) => num % 2 === 0;
const num = 10;
const mess = `${num} is ${isEven(num) ? 'even' : 'odd'}`;
console.log(mess);
