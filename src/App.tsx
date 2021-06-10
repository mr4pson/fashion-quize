import "antd/dist/antd.css";
import { errorResponseHandler } from "common/heplers/common-helpers";
import { axiosInstance } from "components/pages/AdminPage/constants";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
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
