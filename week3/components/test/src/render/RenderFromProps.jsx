function Welcome(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function RenderFromProps() {
  return (
    <div>
      <Welcome name="John" />
      <Welcome name="Jane" />
    </div>
  );
}

export default RenderFromProps;
