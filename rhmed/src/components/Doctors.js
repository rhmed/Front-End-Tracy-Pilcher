import React, { Component } from 'react'
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
const url = 'https://revo-health.herokuapp.com';

export class Doctors extends Component {
  constructor() {
      super();
    this.state = {
      doctors: [],
      doctor: {},
      doctorInput: '',
      doctorToEdit: {}
    };
  }
  async componentDidMount() {
    const {data} = await axios.get(`${url}/api/doctors`);
    this.setState({doctors: data});
  };

  //POST - Add a doctor

  async addDoctor() {
    const doctorToAdd = this.state.doctorInput;
    const {data} = await axios.post(`${url}/api/doctors`, doctorToAdd);
    const currentState = this.state.doctors;
    this.setState({
        doctors: currentState.concat(data),
        doctorInput: ''
        });
  };

// PUT - Update a Doctor: /api/doctors/:id 
async editDoctor(id) {
  debugger
    const doctorToEdit = this.state.doctorEdit
    const {data} = await axios.put(`${url}/api/doctors/${id}`, doctorToEdit);
    const currentState = this.state.doctors;
    this.setState({doctors: currentState.concat(data)});
   
   };

// DELETE - Delete a Doctor: /api/doctors/:id
async deleteDoctor(id) {
    await axios.delete(`${url}/api/doctors/${id}`);
    let doctorsCopy = this.state.doctors 
    for (let i = 0; i < doctorsCopy.length; i++) {
        let doctor = doctorsCopy[i]
    if (doctor.doctor_id === id) { 
        doctorsCopy.splice(i, 1)  // delete the item 
      break                   
    }
  }
  this.setState({doctors: doctorsCopy});
  this.props.history.push(`/doctors`)
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
          <h2>Doctors:</h2>
          <hr />
        {this.state.doctors.map(doctor => {
            const {doctor_id} = doctor;
            return (
                <div>
                <div key={doctor_id}>
                {doctor.doctor_name} &nbsp;&nbsp;
                website: {doctor.doctor_website} &nbsp;&nbsp;
                {/* <button onClick={() => this.editDoctor(doctor_id)}>Edit</button> */}

                <button onClick={() => this.deleteDoctor(doctor_id)}>Delete</button>
                </div>


                </div>
            )
        })}
  
      </div>
    )
  }
}

export default Doctors;
