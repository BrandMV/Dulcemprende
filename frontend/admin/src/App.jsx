import "bootstrap/dist/css/bootstrap.min.css";
import Layout from './components/Diseño/Layout'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Signup from "./Containers/Signup/Signup";
import Signin from "./Containers/Signin/Signin";
import Home from "./Containers/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
