import React, { Component } from 'react';
import axios from 'axios';

//const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:2000'

const initialUser = {
    email: '',
    password: ''
}

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {...initialUser},
            message: ''
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }


    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/auth/registration`, this.state.user)
            .then((res) => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Registration successful',
                        user: { ...initialUser },
                    });
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    message: 'Registration failed.',
                    user: { ...initialUser },
                });
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={this.state.user.email}
                        onChange={this.inputHandler}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />

                    <button type="submit">Submit</button>
                </form>
                {this.state.message ? (<h4>{this.state.message}</h4>) : undefined}
            </div>

        );
    }


}
export default Register;