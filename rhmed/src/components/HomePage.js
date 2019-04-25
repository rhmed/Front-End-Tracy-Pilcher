import React from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Profile from './Profile';
import AddProc from './AddProc';
import Hospitals from './Hospitals';

import '../App.css';

const HomePage = props => {
    return (
      <div>
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
                to="/hospitals">Hospitals</NavLink> 

        </nav>
        <section>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/add" component={AddProc} />
            <Route path="/hospitals" component={Hospitals} />
          </Switch>
        </section>
        <main>
        <h3>Recent Procedures:</h3>

        {props.procs.map(p => <div className="procedure-item" key={p.procedure_id}>{p.procedure_name} USD ${p.cost}</div>)}
        
        </main>
      </div>
    );
}

export default withRouter(HomePage);


