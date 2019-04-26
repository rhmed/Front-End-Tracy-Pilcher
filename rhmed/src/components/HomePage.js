import React from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Procedures from './Procedures';
import Hospitals from './Hospitals';
import Doctors from './Doctors';

import '../App.css';

const HomePage = props => {
    return (
      <div>
        <nav id="User_Nav_menu">
            <NavLink 
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/procedures">Procedures</NavLink> 
            <NavLink 
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/hospitals">Hospitals</NavLink> 
            <NavLink 
                className="User_Nav_link"
                activeClassName="userActiveRoute"
                activeStyle={{ color: 'white' }}
                to="/doctors">Doctors</NavLink> 
        </nav>
        <section>
          <Switch>
            <Route path="/procedures" component={Procedures} />
            <Route path="/hospitals" component={Hospitals} />
            <Route path="/doctors" component={Doctors} />
          </Switch>
        </section>
        <main>
         
        </main>
      </div>
    );
}

export default withRouter(HomePage);


