import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
