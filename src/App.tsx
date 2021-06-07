import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AppRoutes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
