import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import { RegisterPage } from './components/Register';
import { HomePage } from './components/HomePage';
//import GasPrices from './components/GasPrices';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/protected" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;
