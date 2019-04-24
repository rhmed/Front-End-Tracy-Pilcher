import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';

export class HomePage extends Component {
  render() {
    return (
      <div>
          <h3>User Utilities</h3>
        <nav>
            <NavLink to="/profile">Profile</NavLink> { '   ' }
            <NavLink to="/add">Login</NavLink> { '   ' }
            <NavLink to="/search">Search by Zipcode</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/add" component={AddProc} />
            <Route path="/search" component={Search} />
          </Switch>
        </section>
      </div>
    )
  }
}

export default HomePage



