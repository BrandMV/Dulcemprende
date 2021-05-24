import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch} from 'react-router-dom'
import Signup from "./Containers/Signup/Signup";
import Signin from "./Containers/Signin/Signin";
import Home from "./Containers/Home/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getInitialData } from './actions'
import Products from "./Containers/Products/Products";
import Ordenes from "./Containers/Ordenes/Ordenes";
import Category from "./Containers/Category/Category";
import NewPage from "./Containers/NewPage/NewPage";

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    dispatch(getInitialData());

  }, [])
  
  return (
    <div>
  
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Ordenes} />
          <PrivateRoute path="/category" component={Category} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
     
    </div>
  );
}

export default App;
