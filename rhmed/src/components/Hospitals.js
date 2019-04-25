import React, { Component } from 'react'
import axios from 'axios';

 const url = process.env.REACT_APP_API_URL;


export class Hospitals extends Component {
  constructor() {
      super();
    this.state = {
      hospitals: [],
      hospital: {},
      hospitalInput: '',
      hospitalEdit: {}
    };
  }
  async componentDidMount() {
    const {data} = await axios.get(`${url}/api/hospitals`);
    this.setState({hospitals: data});
  };

  //POST - Add a hospital

  async addHospital() {
    const hospitalToAdd = this.state.hospitalInput;
    const {data} = await axios.post(`${url}/api/hospitals`, hospitalToAdd);
    const currentState = this.state.hospitals;
    this.setState({
        hospitals: currentState.concat(data),
        hospitalInput: ''
        });
  };

// PUT - Update a Hospital: /api/hospitals/:id 
async editHospital(id) {
    const hospitalToEdit = this.state.hospitalEdit
    const {data} = await axios.put(`${url}/api/hospitals/${id}`, hospitalToEdit);
    const currentState = this.state.hospitals;
    this.setState({hospitals: currentState.concat(data)});
   };

// DELETE - Delete a Hospital: /api/hospitals/:id
async deleteHospital(id) {
    await axios.delete(`${url}/api/hospitals/${id}`);
    let hospitalsCopy = this.state.hospitals 
    for (let i = 0; i < hospitalsCopy.length; i++) {
        let hospital = hospitalsCopy[i]
    if (hospital.hospital_id === id) { 
        hospitalsCopy.splice(i, 1)  // delete the item 
      break                   
    }
  }
  this.setState({hospitals: hospitalsCopy});
  this.props.history.push(`/hospitals`)
}  

  handleChange = e => {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value
      });   
  };

  render() {
    return (
      <div>
          <h2>Hospitals:</h2>
        {this.state.hospitals.map(hospital => {
            const {hospital_id} = hospital;
            return (
                <div>
                <li key={hospital_id}>
                {hospital.hospital_name} &nbsp;&nbsp;
                {hospital.hospital_website} &nbsp;&nbsp;
                <button onClick={() => this.editHospital(hospital_id)}>Edit</button>
                <button onClick={() => this.deleteHospital(hospital_id)}>Delete</button>
                </li>
                <hr />
                <h2>Add a New Hospital</h2>
                </div>
            )
        })}
      </div>
    )
  }
}

export default Hospitals;
