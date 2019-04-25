import React, { Component } from 'react';
import axios from 'axios';

//const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:2000'

const initialUser = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
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
                    localStorage.setItem('rhmed_email', this.state.user.email);
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
                <label htmlFor="first_name">First Name: </label>
                    <input
                        type="text"
                        // id="first_name"
                        name="first_name"
                        value={this.state.user.first_name}
                        onChange={this.inputHandler}
                    /><br/>
                    <label htmlFor="last_name">Last Name: </label>
                    <input
                        type="last_name"
                        // id="last_name"
                        name="last_name"
                        value={this.state.user.last_name}
                        onChange={this.inputHandler}
                    /><br/>
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
                        type="text"
                        // id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    /><br/>
                    <input 
                        type="hidden"
                        name="user_id"
                        value={Date.now()}
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