// import logo from "../../../assets/img/logo/logo.svg";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "../../../config/redux";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import SplashScreen from "../SplashScreen";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router basename={window.location.pathname || ""}>
        <div>
          {/* <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch> */}
          {/* <Route path="/">
            <Redirect to="/splashscreen" />
          </Route> */}

          <Route path="/dashboard" exact component={Dashboard} />
          <Route exact path="/" component={SplashScreen} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
