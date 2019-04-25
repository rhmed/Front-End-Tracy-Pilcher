import React, { Component } from 'react'
import axios from 'axios';

//const url = process.env.REACT_APP_API_URL;
const url = 'http://localhost:2000'

export class Hospitals extends Component {
  constructor() {
    this.state = {
      hospitals: [],
      hospital: {}

    }
  }
  async componentDidMount() {
    const {hospitals} = await axios.get(`${url}/api/hospitals`);
    this.setState({hospitals: hospitals});
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Hospitals;
