import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { getAppRoutes } from "./routes/routes";
import { TypeAppRoute } from "./routes/type";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {getAppRoutes().map((route: TypeAppRoute) => (
            <Route exact={route.exact} key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
