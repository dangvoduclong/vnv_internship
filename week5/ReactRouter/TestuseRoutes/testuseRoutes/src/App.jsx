import { Link, useRoutes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/user/:userId", element: <UserProfile /> },
];
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};
function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              state={{ from: "nav", customMessage: "Hello from Home" }}
            >
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              state={{ from: "nav", customMessage: "Hello from About" }}
            >
              Giới Thiệu
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              state={{ from: "nav", customMessage: "Hello from Contact" }}
            >
              Liên Hệ
            </Link>
          </li>
          <li>
            <Link
              to="/user/1"
              state={{ from: "nav", customMessage: "Viewing User 1" }}
            >
              Người Dùng 1
            </Link>
          </li>
          <li>
            <Link
              to="/user/2"
              state={{ from: "nav", customMessage: "Viewing User 2" }}
            >
              Người Dùng 2
            </Link>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </>
  );
}

export default App;
