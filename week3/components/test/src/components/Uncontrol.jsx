const Uncontrol = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.name;
    alert("A name was submitted: " + input.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" defaultValue="John Doe" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Uncontrol;
