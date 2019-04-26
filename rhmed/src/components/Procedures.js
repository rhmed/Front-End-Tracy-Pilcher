import React, { Component } from 'react'
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
//const url = 'https://revo-health.herokuapp.com';
const url= 'http://localhost:2000';


export class Procedures extends Component {
  constructor() {
      super();
    this.state = {
      procedures: [],
      procedure: {
        procedure_name: '',
        cost: ''
      }
    };
  }
  

  async componentDidMount() {
    const {data} = await axios.get(`${url}/api/procedures`);
    this.setState({procedures: data});
  };
 
  addProcedure = e => {
    console.log("this.state.procedure: ", this.state.procedure);
      e.preventDefault();
      axios.post(`${url}/api/procedures`, this.state.procedure)
      .then(response => {
        console.log("NewProc: ", response);
        const newProcedure = {
          ...this.state.procedure, 
          procedure_id: response.data.procedure_id
        }
        const currentState = this.state.procedures;
        this.setState({
          procedures: currentState.concat(newProcedure),
          procedure: {
            procedure_name: '',
            cost: ''
          }
        });

        this.props.history.push(`/procedures`);
      })
      .catch(err => {
        console.log("Rejected:", err);
      });
  }
// DELETE - Delete a Procedure: /api/procedures/:id
async deleteProcedure(id) {
    await axios.delete(`${url}/api/procedures/${id}`);
    let proceduresCopy = this.state.procedures 
    for (let i = 0; i < proceduresCopy.length; i++) {
        let procedure = proceduresCopy[i]
    if (procedure.procedure_id === id) { 
        proceduresCopy.splice(i, 1)  // delete the item 
      break                   
    }
  }
  this.setState({procedures: proceduresCopy});
  this.props.history.push(`/procedures`)
}  

  handleChange = e => {
    e.preventDefault();
    this.setState({
        procedure: {
          ...this.state.procedure,
          [e.target.name]: e.target.value
        }
      });   
  };

  render() {
    return (
      <div>
          <h2>Procedures:</h2>
          <hr />       
        {this.state.procedures.map(procedure => {
            const {procedure_id} = procedure;
            return (
                <div>
                <div key={procedure_id}>
                {procedure.procedure_name} &nbsp;&nbsp;
                USD$: {procedure.cost} &nbsp;&nbsp;
                <button onClick={() => this.deleteProcedure(procedure_id)}>Delete</button>
                </div>
      </div>
            )
        })}
          <hr />
          <h2>Add a New Procedure</h2>
          <div className='item-form'>
            <form onSubmit={this.addProcedure}>
            <h3>Procedure Desc:</h3>
              <input
                type='text'
                value={this.state.procedure.procedure_name}
                name='procedure_name'
                onChange={this.handleChange}
              /><br />
              <h3>Procedure Cost:</h3>
                <input
                type='text'
                value={this.state.procedure.cost}
                name='cost'
                onChange={this.handleChange}
              /><br />
              <button>Add</button>
            </form>           
          </div>
          <hr />
        </div>
    )
  }
}

export default Procedures;
