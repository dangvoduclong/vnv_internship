import { useState } from "react";

// response data from API
const courses = [
  {
    id: 1,
    name: "Javascript",
  },
  {
    id: 2,
    name: "ReactJS",
  },
  {
    id: 3,
    name: "NodeJS",
  },
];
const handleSubmit = () => {};
const ExWay2Radio = () => {
  const [checked, setChecked] = useState();
  console.log(checked);

  const handleSubmit = () => {
    // CALL API
    console.log({ id: checked });
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <input
            type="radio"
            checked={checked === course.id}
            onChange={() => setChecked(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExWay2Radio;
