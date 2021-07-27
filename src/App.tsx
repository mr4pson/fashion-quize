import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { errorResponseHandler } from "common/helpers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { useAuth } from "hooks/useAuth";
import AppRoutes from "routes/AppRoutes";

import "antd/dist/antd.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import "./App.css";


function App() {
  const history = useHistory();
  const { logout } = useAuth(history);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      errorResponseHandler({ error, logout });
    }
  );

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
