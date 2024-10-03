import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice";

const logMiddleware = (storeAPI) => (next) => (action) => {
  console.log("Dispatching action:", action); // Log action
  const result = next(action); // Dispatch action tiếp theo
  console.log("Next state:", storeAPI.getState()); // Log state sau khi action được xử lý
  return result;
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logMiddleware),
});

// const store = createStore(todoReducer);
// export default store;
