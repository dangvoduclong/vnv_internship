const users = [
  { id: 1, lastName: "John", firstName: "John", age: 25 },
  { id: 2, lastName: "Pete", firstName: "Pete", age: 30 },
  { id: 3, lastName: "Mary", firstName: "Mary", age: 28 },
  { id: 4, lastName: "Sara", firstName: "Sara", age: 21 },
  { id: 5, lastName: "Sunny", firstName: "Sunny", age: 28 },
  { id: 6, lastName: "Harry", firstName: "Harry", age: 28 },
  { id: 7, lastName: "Suzy", firstName: "Suzy", age: 27 },
];
// 1. Trả về 1 mảng id của users
// 2. Viết code để tạo một mảng khác từ mảng trên, gồm các đối tượng có id, age và fullName, trong đó fullName được tạo từ firstName và lastName (vd John - John)
// 3. Sắp xếp mảng trên theo độ tuổi tăng dần
// 4. Trả về ds những user có tuổi = 28
// 5. Trả về ds id những user có tuổi > 25
// 6. Kiểm tra xem có phải tất cả user đều có tuổi > 22 hay không?
// 7. Kiểm tra xem có user nào < 22 tuổi không?
// 8. Trả về nhân viên lớn tuổi nhất trong mảng
// 9. Cho 1 mảng id [1, 4, 5] trả về ds user có trong mảng id này

// 10. Cho mảng data = [{ id: 1}, { id: 1}, { id: 1}, { id: 3}, { id: 4}, { id: 4}, { id: 3}, { id: 1}, { id: 2}]. Thêm 1 field count vào mảng users là số lần id trong mảng data trùng vs mảng users
const idU = users.map((i) => i.id);
console.log(idU);

const newu = users.map((u) => {
  return {
    id: u.id,
    age: u.age,
    fullName: `${u.lastName} - ${u.firstName}`,
  };
});
console.log(newu);

const sortu = newu.sort((a, b) => a.age - b.age);
console.log(sortu);

const ageu = newu.filter((e) => e.age == 28);
console.log(ageu);

const ageu2 = newu.filter((e) => e.age > 25).map((e) => e.id);
console.log(ageu2);

const ageu3 = newu.every((e) => e.age > 22);
console.log(ageu3);

const ageu4 = newu.some((e) => e.age < 22);
console.log(ageu4);

console.log(sortu[sortu.length - 1]);

const iid = [1, 4, 5];
const check = newu.filter((e) => iid.includes(e.id));
console.log("9: ", check);

const ddata = [
  { id: 1 },
  { id: 1 },
  { id: 1 },
  { id: 3 },
  { id: 4 },
  { id: 4 },
  { id: 3 },
  { id: 1 },
  { id: 2 },
];
// Thêm 1 field count vào mảng users là số lần id trong mảng data trùng vs mảng users
// c1 reduce
//  id: 7, age: 27, fullName: 'Suzy - Suzy' , count: }su dung filter

const q = users.map((e) => {
  return {
    id: e.id,
    age: e.age,
    count: ddata.filter((i) => i.id === e.id).length,
  };
});
console.log("11: ", q);
//11. Cho mảng
const users2 = [
  { id: 1, lastName: "John", firstName: "John", age: 25 },
  { id: 3, lastName: "Mary", firstName: "Mary", age: 28 },
  { id: 5, lastName: "Sunny", firstName: "Sunny", age: 28 },
  { id: 7, lastName: "Suzy", firstName: "Suzy", age: 27 },
  { id: 9, lastName: "Misa", firstName: "Misa", age: 27 },
  { id: 11, lastName: "Henry", firstName: "Henry", age: 27 },
];
// Tìm những user mà users có mà users2 k có và ngược lại?
// Tìm những user mà cả users và users2 đều có?
const user2Ids = users2.map((e) => e.id);
const userIds = users.map((e) => e.id);
console.log(user2Ids);
console.log(userIds);

console.log(
  "u1 co u2 k co",
  users.filter((e) => !user2Ids.includes(e.id))
);
console.log(
  "Users có trong users mà không có trong users2:",
  users.filter((user) => !users2.some((user2) => user2.id === user.id))
);
const uniqueInUsers = [];
users.forEach((user) => {
  if (users2.every((user2) => user2.id !== user.id)) {
    uniqueInUsers.push(user);
  }
});
console.log("Users có trong users mà không có trong users2:", uniqueInUsers);

console.log(
  "ca 2 deu co",
  users.filter((e) => user2Ids.includes(e.id))
);
console.log(
  "Users có trong cả hai mảng:",
  users.filter((user) => users2.some((user2) => user2.id === user.id))
);
const commonUsers = [];
users.forEach((user) => {
  if (users2.some((user2) => user2.id === user.id)) {
    commonUsers.push(user);
  }
});
console.log("Users có trong cả hai mảng:", commonUsers);

console.log(
  "u2 co u1 k co(9-11)",
  users2.filter((e) => !userIds.includes(e.id))
);
console.log(
  "Users có trong users2 mà không có trong users:",
  users2.filter((user2) => !users.some((user) => user.id === user2.id))
);
const uniqueInUsers2 = [];
users2.forEach((user2) => {
  if (users.every((user) => user.id !== user2.id)) {
    uniqueInUsers2.push(user2);
  }
});
console.log("Users có trong users2 mà không có trong users:", uniqueInUsers2);
// lam bt some every

// 12. Gộp 2 mảng users và users2 và xoá những phần tử trùng nhau?
console.log("cau 12");
const combined = [...users, ...users2];
const uniqueUsers = [
  ...new Map(combined.map((user) => [user.id, user])).values(),
];
const uniqueUsers2 = combined.filter(
  (user, index, self) => index === self.findIndex((t) => t.id === user.id)
);
console.log(uniqueUsers);
console.log(uniqueUsers2);

//13. Cho mảng
// ]. Dựa vào mảng trên và mảng users ban đầu nếu type = true thì thêm 1 field bonus tương ứng vào mảng users
const details = [
  { userId: 1, type: true, bonus: 20000 },
  { userId: 3, type: false, bonus: 30000 },
  { userId: 5, type: true, bonus: 50000 },
];

const updatedUsers = users.map((user) => {
  const detail = details.find((d) => d.userId === user.id);
  if (detail && detail.type) {
    return { ...user, bonus: detail.bonus };
  }
  return user;
});

console.log(updatedUsers);
