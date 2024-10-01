import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=4"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: state.todos.length + 1,
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = newText;
      }
    },
    clearCompletedTodo: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    clearAllTodo: (state) => {
      state.todos = [];
    },
    completedAllTodo: (state) => {
      state.todos.forEach((todo) => {
        todo.completed = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
  clearCompletedTodo,
  clearAllTodo,
  completedAllTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
