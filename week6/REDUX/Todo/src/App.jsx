import { Provider } from "react-redux";
import TodoRedux from "./components/TodoRedux";
import TodoRTK from "./components/TodoRTK";
import { store } from "./redux/store";

function App() {
  return (
    <div className="flex justify-center items-center h-screen gap-16">
      <div>
        <TodoRedux />
      </div>
      <div>
        <Provider store={store}>
          <TodoRTK />
        </Provider>
      </div>
    </div>
  );
}

export default App;
