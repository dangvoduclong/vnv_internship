// Giả lập dữ liệu trả về từ API ---------------------------------------------------
const apiResponse = {
  status1: "success",
  data1: {
    users1: [
      {
        id1: 1,
        name1: "Alice",
        email01: "alice@example.com",
        profile1: { age01: 30, city01: "New York" },
      },
      {
        id1: 2,
        name1: "Bob",
        email1: "bob@example.com",
        profile1: { age01: 25, city1: "San Francisco" },
      },
    ],
    meta: {
      totalCount: 2,
    },
  },
  timestamp: "2024-09-01T12:34:56Z",
};

const {
  status1,
  data1: {
    users1: [
      {
        id1,
        name1,
        email01,
        profile1: { age01, city01 },
      },
      users2,
    ],
    meta: { totalCount },
  },
  timestamp,
} = apiResponse;

console.log(status1, id1, name1, email01, age01, city01, totalCount, timestamp);

console.log(users2);

// Dữ liệu đầu vào --------------------------------------------------------------
const employee = {
  id: 123,
  personalInfo: {
    name: "John Doe",
    age: 30,
  },
  jobDetails: {
    position: "Software Engineer",
    department: "Engineering",
  },
  address: null,
};

const {
  id,
  personalInfo: { name, age },
  jobDetails: { position, department },
  address = "Not provided",
} = employee;

console.log(name); // 'John Doe'
console.log(age); // 30
console.log(position); // 'Software Engineer'
console.log(department); // 'Engineering'
console.log(address); // 'Not provided'

// Dữ liệu đầu vào --------------------------------------------------------------
const data = [
  [1, 2, 3],
  [4, 5, [6, 7]],
  [8, 9],
];

const [[f, s, t], [fo, fi, [six, se]], [e, n]] = data;

console.log(f);
console.log(s);
console.log(t);
console.log(fo);
console.log(fi);
console.log(six);
console.log(se);
console.log(e);
console.log(n);

// Dữ liệu đầu vào --------------------------------------------------------------
const user = {
  name1: "Jane Smith",
  age1: 28,
  contact: {
    email: "jane@example.com",
  },
};

const displayUserInfo = ({ name1, age1, contact: { email } }) => {
  console.log(`Name: ${name1}`);
  console.log(`Age: ${age1}`);
  console.log(email);
};

// Gọi hàm với đối tượng
displayUserInfo(user);

// Dữ liệu đầu vào --------------------------------------------------------------
const data2 = {
  id2: 456,
  items2: [
    { name: "Apple", price: 1.2 },
    { name: "Banana", price: 0.8 },
  ],
  metadata: {
    createdAt: "2024-01-01",
    updatedAt: "2024-01-02",
  },
};
const {
  id2,
  items2: [firstItems, SecondItems],
  metadata,
} = data2;
const { name: secondName, price: secondPrice } = SecondItems;
const { createdAt, updatedAt } = metadata;
console.log(id2);
console.log(firstItems.name);
console.log(secondName);
console.log(secondPrice);
console.log(createdAt);
console.log(updatedAt);

// Hàm trả về một đối tượng --------------------------------------------------------------
function getUserData() {
  return {
    id3: 789,
    name3: "Sam Brown",
    roles3: ["admin", "editor"],
    address3: {
      street3: "123 Main St",
      city3: "Hometown",
    },
  };
}

const {
  id3,
  name3,
  roles3: [ad, ed],
  address3: { street3, city3 },
} = getUserData();
console.log(id3);
console.log(name3);
console.log(ad);
console.log(street3);
console.log(
  `------------------------------------------------------------------`
);
