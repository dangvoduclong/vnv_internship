function NestedList(props) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          {item.text}
          <ul>
            {item.subItems.map((subItem) => (
              <li key={subItem.id}>{subItem.text}</li> // Cả danh sách con cũng có key
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
