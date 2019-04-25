import React, { Component } from 'react';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';

import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

// const url = process.env.REACT_APP_API_URL;
const url = 'https://revo-health.herokuapp.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      procs: [],
      filteredProcs: []
    };
  }

  authenticate = () => {
    const token = localStorage.getItem('secret_token');
    const options = {
      headers: {
        authorization: token
      }
    };

    if (token) {
      axios.get(`${url}/api/procedures`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ loaded: true, loggedIn: true, procs: res.data});
          }
          else {
            throw new Error();
          }
        })
        .catch((err) => {
          this.props.history.push('/login');

        });
    } else {
      this.props.history.push('/login');
    }
  }
  
  componentDidMount() {
    this.authenticate();
    
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  searchPostsHandler = e => {
    // eslint-disable-next-line
    const procs = this.state.procs.filter(p => {
      if (p.procedure_name.includes(e.target.value)) {
        return p;
      }
    });
    this.setState({ filteredProcs: procs });
    
  };

  render() {
    return (
      <div className="App">
      <h1>Welcome to Revolutionize Health</h1>
      {/* {console.log("this.state.procs: ", this.state.procs)} */}
      {!this.state.loaded && 
        <nav nav id="Nav_menu">
        
          <NavLink 
            className="Nav_link"
            activeClassName="activeRoute"
            activeStyle={{ color: 'black' }}
            to="/login">Login</NavLink>
          <NavLink 
            className="Nav_link"
            activeClassName="activeRoute"
            activeStyle={{ color: 'black' }}
            to="/register">Register</NavLink>     
       
        </nav>
      }
    
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            {this.state.loaded && 
            <Route path="/" 
              render={() => <HomePage 
                procs={
                  this.state.filteredProcs.length > 0
                ? this.state.filteredProcs
                : this.state.procs} 
                /> 
              }
               />
              }
              
          </Switch>
        </section>
        {this.state.loaded && 
        <div className="search-box">
          <input 
            type="text"
            placeholder="Search Procedures"
            onKeyDown={this.searchPostsHandler}></input>
        </div>
        }
      </div>
    );
  }
}

export default withRouter(App);