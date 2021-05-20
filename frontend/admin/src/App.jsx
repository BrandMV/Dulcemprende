import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch} from 'react-router-dom'
import Signup from "./Containers/Signup/Signup";
import Signin from "./Containers/Signin/Signin";
import Home from "./Containers/Home/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'


function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn)
    }})
  
  return (
    <div>
  
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
     
    </div>
  );
}

export default App;
