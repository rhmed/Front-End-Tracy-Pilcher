import React, { Component } from 'react'
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
const url = 'https://revo-health.herokuapp.com';


export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    }
  }
  async componentDidMount() {
    const {user} = await axios.get(`${url}/api/users/:id`);
    this.setState({user: user});
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Profile
