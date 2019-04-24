import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import AddProc from './AddProc';
import Search from './Search';

import '../App.css';

export class HomePage extends Component {
  render() {
    return (
      <div>
          <h2>User Utilities</h2>
        <nav id="User_Nav_menu">
            <NavLink
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/profile">Profile</NavLink>
            <NavLink 
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/add">Add New</NavLink> 
            <NavLink 
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/search">Search</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/add" component={AddProc} />
            <Route path="/search" component={Search} />
          </Switch>
        </section>
        <main>
        <h3>Main homepage content here.</h3>
        </main>
      </div>
    )
  }
}

export default HomePage



