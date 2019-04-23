import React, { Component } from 'react';
import axios from 'axios'
import Register from './components/Register';
import Login from './components/Login';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

const url = process.env.REACT_APP_API_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      jokes: []
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
      axios.get(`${url}/api/jokes`, options)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ loggedIn: true, jokes: res.data});
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
    console.log(this.props);
    console.log(prevProps);
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" render={() => {
              return (
                <React.Fragment>
                  <h2>jokes</h2>
                  <ol>
                    {this.state.jokes.map(joke => {
                      return(
                        <div className="joke" key={joke.id}>
                          <p>{joke.setup}</p>
                          <p key={joke.id}>{joke.punchline}</p>
                        </div>
                      )
                    })}
                  </ol>
                </React.Fragment>
              );
            }} />
          </Switch>

        </section>
      </div>
    );
  }
}

export default withRouter(App);