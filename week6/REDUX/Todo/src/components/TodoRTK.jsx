import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  clearAllTodo,
  clearCompletedTodo,
  completedAllTodo,
  fetchTodos,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "../redux/slice/todoSlice";

const TodoRTK = () => {
  const [todoText, setTodoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const todos = useSelector((state) => state.todo.todos);
  const status = useSelector((state) => state.todo.status);
  const error = useSelector((state) => state.todo.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = setTimeout(() => {
      dispatch(fetchTodos());
    }, 2000);

    return () => clearTimeout(fetchData);
  }, [dispatch]);

  console.log(todos);

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      if (isEditing) {
        dispatch(updateTodo({ id: editedTodoId, newText: todoText }));
        setIsEditing(false);
        setEditedTodoId(null);
      } else {
        dispatch(addTodo(todoText));
      }
      setTodoText("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleUpdateTodo = (id, newText) => {
    setIsEditing(true);
    setEditedTodoId(id);
    setTodoText(newText);
  };

  const filteredTodo = todos
    .filter(
      (todo) =>
        todo.title &&
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((todo) => {
      if (filterStatus === "completed") return todo.completed;
      if (filterStatus === "notCompleted") return !todo.completed;
      return true; // 'all'
    });

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full ">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List + RTK</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button
              onClick={handleAddTodo}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-orange-500 hover:bg-teal-200"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {status === "loading" && <p>Loading todos...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        <div className="mb-4">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="mr-2">Filter: </label>
          <select
            className="shadow appearance-none border rounded py-2 px-3 text-grey-darker"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>

        <div>
          {filteredTodo.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center p-2 my-2 bg-white border rounded shadow ${
                todo.id === editedTodoId ? "border-blue-500" : "bg-white"
              }`}
            >
              <p
                className={`w-full ${
                  todo.completed ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {todo.title}
              </p>
              <button
                onClick={() => handleUpdateTodo(todo.id, todo.title)}
                className="flex-no-shrink p-2 ml-2 border-2 rounded hover:text-cyan-500 text-teal hover:bg-red-300"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(handleRemoveTodo(todo.id))}
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-yellow-500 text-teal-500 hover:bg-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => dispatch(handleToggleTodo(todo.id))}
                className={`flex-no-shrink p-2 ml-2 border-2 rounded 
                    ${
                      todo.completed
                        ? "text-white bg-blue-500"
                        : "text-teal hover:text-sky-700 hover:bg-orange-400"
                    }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => dispatch(clearCompletedTodo())}
            className="p-2 border-2 rounded bg-red-500 text-white"
          >
            Clear Completed
          </button>
          <button
            onClick={() => dispatch(clearAllTodo())}
            className="p-2 border-2 rounded bg-yellow-500 text-white"
          >
            Clear All
          </button>
          <button
            onClick={() => dispatch(completedAllTodo())}
            className="p-2 border-2 rounded bg-green-500 text-white"
          >
            Complete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoRTK;
