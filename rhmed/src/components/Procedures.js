import React, { Component } from 'react'
import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;
const url = 'https://revo-health.herokuapp.com';

export class Procedures extends Component {
  constructor() {
      super();
    this.state = {
      procedures: [],
      procedure: {},
      procedureInput: '',
      procedureToEdit: {},
      items: [],
      filteredItems: [],
      list: []
    };
  }
  async componentDidMount() {
    const {data} = await axios.get(`${url}/api/procedures`);
    this.setState({procedures: data});
  };

  //POST - Add a procedure

  async addProcedure() {
    const procedureToAdd = this.state.procedureInput;
    const {data} = await axios.post(`${url}/api/procedures`, procedureToAdd);
    const currentState = this.state.procedures;
    this.setState({
        procedures: currentState.concat(data),
        procedureInput: ''
        });
  };

// PUT - Update a Procedure: /api/procedures/:id 
async editProcedure(id) {
  debugger
    const procedureToEdit = this.state.procedureEdit
    const {data} = await axios.put(`${url}/api/procedures/${id}`, procedureToEdit);
    const currentState = this.state.procedures;
    this.setState({procedures: currentState.concat(data)});
   
   };

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
        [e.target.name]: e.target.value
      });   
  };
  //SEARCH
  searchPostsHandler = e => {
    const items = this.state.items.filter(item => {
      if (item.procedure_name.includes(e.target.value)) {
        return items;
      }
    });
    this.setState({ filteredItems: items });   
  };

  render() {
    return (
      <div>
          <h2>Procedures:</h2>
          <hr />
         {/* {list = this.state.filteredItems.length > 0
              ? this.state.filteredItems
              : this.state.procedures} */}
        {this.state.procedures.map(procedure => {
            const {procedure_id} = procedure;
            return (
                <div>
                <div key={procedure_id}>
                {procedure.procedure_name} &nbsp;&nbsp;
                USD$: {procedure.cost} &nbsp;&nbsp;
                {/* <button onClick={() => this.editProcedure(procedure_id)}>Edit</button> */}

                <button onClick={() => this.deleteProcedure(procedure_id)}>Delete</button>
                </div>
      </div>
            )
        })}
          <hr />
          <h2>Add a New Procedure</h2>
          <hr />
          <h2>Search:</h2>
          <div className="search-box">
          <input 
            type="text"
            placeholder="Search Procedures"
            onKeyDown={this.searchPostsHandler}></input>
        </div>
      </div>
    )
  }
}

export default Procedures;
