import "./App.css";
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
function App() {
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
    <>
      <h3>Todo App</h3>
      <input
        ref={inputRef}
        type="text"
        value={job}
        onChange={(e) => dispatch(setJob(e.target.value))}
      />
      <button onClick={handleAddJob}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job} ;
            <span onClick={() => dispatch(deleteJob(index))}>&times</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
