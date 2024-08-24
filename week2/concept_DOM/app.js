const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");

const generateTemplate = (todo) => {
  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center m-1">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
  list.innerHTML += html;
};

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos !== null ? JSON.parse(storedTodos) : [];
};

document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = getTodos();
  storedTodos.forEach((todo) => generateTemplate(todo));
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    const todos = getTodos();
    if (todos.includes(todo)) {
      alert("Todo already exists!");
    } else {
      generateTemplate(todo);
      todos.push(todo);
      saveTodos(todos);
      addForm.reset();
    }
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todoText = e.target.previousElementSibling.textContent;
    e.target.parentElement.remove();
    let todos = getTodos();
    todos = todos.filter((todo) => todo !== todoText);
    saveTodos(todos);
  }
});
