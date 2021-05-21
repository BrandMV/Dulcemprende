import React from 'react'
import HomePage from './containers/HomePage/HomePage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductsListPage from './containers/ProductsListPage/ProductsListPage'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/:slug" component={ProductsListPage} />
                </Switch>
            </Router>
           
        </div>
    )
}

export default App
