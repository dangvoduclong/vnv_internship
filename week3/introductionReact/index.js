/**
 *  React is a library for building user interfaces.
 * React's primary goal is to minimize the bugs that occur when developers are building UIs. 
 * It does this through the use of components — self-contained, logical pieces of code that describe a portion of the user interface. 
 * These components can be composed together to create a full UI, and React abstracts away much of the rendering work, leaving you to concentrate on the UI design.
 * 
 * React utilizes features of modern JavaScript for many of its patterns. 
 * Its biggest departure from JavaScript comes with the use of JSX syntax. 
 * JSX extends JavaScript's syntax so that HTML-like code can live alongside it. For example: const heading = <h1>Mozilla Developer Network</h1>;


==> Because JSX is a blend of HTML and JavaScript,

--------- benefits of React
a. Cấu Trúc Thành Phần (Component-Based Architecture)
Modular and Reusable Components: React giúp bạn xây dựng ứng dụng bằng cách chia nhỏ UI thành các thành phần (components) nhỏ, 
độc lập và có thể tái sử dụng. Mỗi thành phần có thể quản lý trạng thái của nó và render giao diện tương ứng.

b. Virtual DOM
Efficient Updates: React sử dụng Virtual DOM để tăng hiệu suất. Thay vì cập nhật toàn bộ DOM khi có thay đổi, 
React cập nhật Virtual DOM trước và sau đó so sánh với DOM thực tế. Chỉ các phần thay đổi sẽ được cập nhật, giúp giảm thiểu thao tác DOM và cải thiện hiệu suất.

c. Một Hướng Dữ Liệu (One-Way Data Binding)
Predictable Data Flow: Dữ liệu trong React được truyền từ các thành phần cha xuống các thành phần con qua props, giúp quản lý dữ liệu và theo dõi các thay đổi dễ dàng hơn.
function ParentComponent() {
  const [count, setCount] = React.useState(0);
  return <ChildComponent count={count} />;
}

function ChildComponent({ count }) {
  return <p>The count is {count}</p>;
}

d. JSX (JavaScript XML)
Declarative Syntax: JSX là một cú pháp mở rộng của JavaScript cho phép bạn viết mã HTML trong JavaScript. Nó giúp bạn dễ dàng xây dựng giao diện người dùng và làm cho mã trở nên dễ đọc hơn.
Nhúng biểu thức JavaScript: Bạn có thể nhúng các biểu thức JavaScript trong JSX bằng cách sử dụng dấu {}.
const name = 'John';
const element = <h1>Hello, {name}!</h1>;

e. Quản Lý Trạng Thái (State Management)
Local Component State: React cung cấp cách đơn giản để quản lý trạng thái trong các thành phần với useState và useReducer.
 */
