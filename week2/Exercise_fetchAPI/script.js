let tittles = [];
const fetchRandomTitle = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomTitle = data[randomIndex].title;

    const titleInput = document.getElementById("titleInput");
    titleInput.value = randomTitle;
  } catch (error) {
    console.error("Error:", error);
  }
};

const addTitleToList = () => {
  const titleInput = document.getElementById("titleInput");
  const title = titleInput.value;
  if (title === "") {
    document.getElementById("message").textContent =
      "Please enter button addTitle";
    return;
  }
  if (tittles.includes(title)) {
    document.getElementById("message").textContent = "Title already exists";
    fetchRandomTitle();
    return;
  }

  tittles.push(title);
  const titleList = document.getElementById("titleList");
  const li = document.createElement("li");
  li.textContent = title;
  titleList.appendChild(li);
  titleInput.value = "";
  document.getElementById("message").textContent = "";
};

document
  .getElementById("fetchButton")
  .addEventListener("click", fetchRandomTitle);
document.getElementById("addButton").addEventListener("click", addTitleToList);
