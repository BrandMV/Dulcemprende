import React, {useEffect} from 'react'
import HomePage from './containers/HomePage/HomePage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductsListPage from './containers/ProductsListPage/ProductsListPage'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'
import ProductDetails from './containers/ProductDetailsPage/ProductDetails'

const App = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {

        if(!auth.authenticate){
            dispatch(isUserLoggedIn())
        }


    }, [auth.authenticate])


    return (
        <div>
            <Router>
                <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/:productSlug/:productId/p" component={ProductDetails} /> {/*primero para que no renderee*/}
                        <Route path="/:slug" component={ProductsListPage} />

                </Switch>
            </Router>
           
        </div>
    )
}

export default App
