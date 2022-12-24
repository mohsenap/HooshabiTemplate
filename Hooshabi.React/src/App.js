import logo from "./logo.svg";
import BaseApp from "./Lib/Base/BaseApp";
import BaseRouter from "./Lib/Base/BaseRouter";
import "./App.css";

function App(props) {
  return (
    <BaseApp {...props}>
      <BaseRouter {...props}></BaseRouter>
    </BaseApp>
  );
}

export default App;
