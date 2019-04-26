import React, { Component } from 'react';
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
//const url = 'https://revo-health.herokuapp.com';
const url= 'http://localhost:2000';

const initialUser = {
    email: '',
    password: ''
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: ''
        };
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/auth/login`, this.state.user)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    console.log("res.data: ", res.data);
                    console.log("this.state.user: ", this.state.user);
                    localStorage.setItem('secret_token', res.data.token);
                    localStorage.setItem('user_id', this.state.user.user_id);
                    this.props.history.push('/');
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                this.setState({
                    message: 'Authentication failed.',
                    user: { ...initialUser },
                });
            });
    }

    render() {
        return (
            <div className="user-form">
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        // id="email"
                        name="email"
                        value={this.state.user.email}
                        onChange={this.inputHandler}
                    /><br/>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        // id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    /><br/>
                    <button type="submit">Submit</button>
                </form>
                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined}
            </div>

        );
    }
}

export default Login;