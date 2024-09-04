///////////////////////////////////////////////////////////////////////////////// Promise
let myPromise = new Promise((resolve, reject) => {
  let success = true;
  if (success) {
    resolve("Operation was successful!");
  } else {
    reject("Operation failed.");
  }
});
// Sử dụng Promise
myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

///// Hàm cũ sử dụng Promise
function fetchData() {
  return fetch("https://api.example.com/data").then((response) =>
    response.json()
  );
}

// Hàm mới sử dụng async/await
async function fetchData() {
  const response = await fetch("https://api.example.com/data");
  return await response.json();
}

/////////////////////////////////////////////////////////////////////////////// Async/Await
const fetchMessage = async () => {
  return "Hello, World!";
};

fetchMessage().then((message) => console.log(message)); // Hello, World!

const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve("Data after delay"), ms));

const fetchData = async () => {
  const data = await delay(2000);
  console.log(data); // Data after delay
};

fetchData();

const failingOperation = async () => {
  throw new Error("Something went wrong!");
};

const handleOperation = async () => {
  try {
    await failingOperation();
  } catch (error) {
    console.error(error.message); // Something went wrong!
  }
};

handleOperation();

// Chạy nhiều Promise đồng thời
const fetchData3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
const fetchData4 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 2"), 1500));

const fetchAllData = async () => {
  const [data1, data2] = await Promise.all([fetchData3(), fetchData4()]);
  console.log(data1); // Data 1
  console.log(data2); // Data 2
};

fetchAllData();

// Chạy nhiều Promise tuần tự
const fetchData1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
const fetchData2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 2"), 1500));

const fetchSequentially = async () => {
  const data1 = await fetchData1();
  console.log(data1); // Data 1

  const data2 = await fetchData2();
  console.log(data2); // Data 2
};

fetchSequentially();

///////////////////////////////////////////////////////////////////////////////// Fetch API
const fetchPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log(data);
};

fetchPost();

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

postData("https://jsonplaceholder.typicode.com/posts", {
  title: "foo",
  body: "bar",
  userId: 1,
}).then((data) => console.log(data));

const postFormData = async (url = "", formData = new FormData()) => {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return await response.json();
};

const formData = new FormData();
formData.append("key", "value");

postFormData("https://example.com/submit", formData).then((data) =>
  console.log(data)
);

// Xử lý dữ liệu từ nhiều API
const fetchDataFromApis = async () => {
  try {
    const [response1, response2] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1"),
      fetch("https://jsonplaceholder.typicode.com/posts/2"),
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();

    console.log("Data 1:", data1);
    console.log("Data 2:", data2);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fetchDataFromApis();

//////////////////////////////////////////////////////////////////////////////////  Xử lý Asynchronous Operations
const asyncOperation = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Operation complete"), 1000)
  );

const handleAsyncOperation = async () => {
  const result = await asyncOperation();
  console.log(result); // Operation complete
};

handleAsyncOperation();

const asyncTask3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000));
const asyncTask4 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 1500));

const handleTasks = async () => {
  const results = await Promise.all([asyncTask3(), asyncTask4()]);
  console.log(results); // ['Task 1 completed', 'Task 2 completed']
};

handleTasks();

const asyncTask1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 1 completed"), 1000));
const asyncTask2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Task 2 completed"), 500));

const handleTasksRace = async () => {
  const result = await Promise.race([asyncTask1(), asyncTask2()]);
  console.log(result); // Task 2 completed
};

handleTasksRace();

const fetchData = (url) => fetch(url).then((response) => response.json());

const fetchMultipleData = async () => {
  const [data1, data2] = await Promise.all([
    fetchData("https://jsonplaceholder.typicode.com/posts/1"),
    fetchData("https://jsonplaceholder.typicode.com/posts/2"),
  ]);
  console.log("Data 1:", data1);
  console.log("Data 2:", data2);
};

fetchMultipleData();

//////////////////////////////////////////////////////////////////////////////////  Try Catch block
// Xử Lý Lỗi Cơ Bản
const divide = (a, b) => {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (error) {
    console.error(error.message); // Cannot divide by zero
  }
};

console.log(divide(10, 0)); // Không in ra kết quả
console.log(divide(10, 2)); // 5

//  Xử Lý Lỗi Trong Asynchronous Code
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Data fetch failed")), 1000);
  });

const getData = async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data:", error.message); // Failed to fetch data: Data fetch failed
  }
};

getData();

// Xử Lý Lỗi Khi Gọi Hàm
const callNonExistentFunction = () => {
  try {
    nonExistentFunction(); // Hàm không tồn tại
  } catch (error) {
    console.error("An error occurred:", error.message); // An error occurred: nonExistentFunction is not defined
  }
};

callNonExistentFunction();

// Xử Lý Lỗi Trong JSON Parsing
const parseJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    console.log(parsed);
  } catch (error) {
    console.error("Invalid JSON:", error.message); // Invalid JSON: Unexpected token o in JSON at position 1
  }
};

parseJSON('{"name": "John", "age": 30}'); // { name: 'John', age: 30 }
parseJSON('{name: "John", age: 30}'); // Invalid JSON: Unexpected token n in JSON at position 1

// Xử Lý Lỗi Trong Thao Tác Với DOM
const manipulateDOM = () => {
  try {
    const element = document.getElementById("nonExistentElement");
    if (!element) {
      throw new Error("Element not found");
    }
    element.textContent = "Hello, World!";
  } catch (error) {
    console.error("DOM manipulation error:", error.message); // DOM manipulation error: Element not found
  }
};

manipulateDOM();
