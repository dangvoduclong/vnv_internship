import { useRef } from "react";

const TestRefDOM = () => {
  const inputRef = useRef();
  const handleFocus = () => {
    inputRef.current.focus();
  };
  const handleClear = () => {
    inputRef.current.value = "";
  };
  //////////////////////////////////
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something here..."
        />
        <button onClick={handleFocus}>Focus Input</button>
        <button onClick={handleClear}>Clear Input</button>
      </div>
      <div>
        <button onClick={scrollToSection}>Scroll to Section</button>
        <div style={{ height: "100vh", backgroundColor: "lightblue" }}>
          Scroll down to see the section...
        </div>
        <div
          ref={sectionRef}
          style={{ height: "50vh", backgroundColor: "lightgreen" }}
        >
          You've reached the section!
        </div>
      </div>
    </div>
  );
};

export default TestRefDOM;
