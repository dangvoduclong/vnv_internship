import { useReducer, useRef } from "react";

const initState = {
  job: "",
  jobs: [],
};

const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};
const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

console.log(setJob());

const reducer = (state, action) => {
  console.log("Action", action);
  console.log("Prev State", state);

  let newState;

  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, state.job],
      };
      break;
    case DELETE_JOB:
      newState = {
        ...state,
        jobs: state.jobs.filter((job, index) => index !== action.payload),
      };
      break;
    default:
      throw new Error("Invalid action");
  }

  console.log("New State", newState);
  return newState;
};
const TodoRedux = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { job, jobs } = state;

  const inputRef = useRef();

  const handleAddJob = () => {
    if (job.trim() !== "") {
      dispatch(addJob(job));
      dispatch(setJob(""));
      inputRef.current.focus();
    }
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Todo App + Redux</h3>
      <input
        ref={inputRef}
        className="border border-gray-400 p-2 rounded mb-2 mr-2"
        type="text"
        value={job}
        onChange={(e) => dispatch(setJob(e.target.value))}
      />
      <button
        onClick={handleAddJob}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
      <ul className="mt-4">
        {jobs.map((job, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            {job}
            <span
              className="cursor-pointer text-red-500 "
              onClick={() => dispatch(deleteJob(index))}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoRedux;
