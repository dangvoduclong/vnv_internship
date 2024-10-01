export const ADD_TODO = "add_todo";
export const REMOVE_TODO = "remove_todo";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
