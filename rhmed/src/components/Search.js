import React, { Component } from 'react'
import axios from 'axios';
import SearchResults from './SearchResults';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            procs: [],
            filteredProcs: []
        };
    }

    componentDidMount() {
        this.setState({ procs: this.state.procs });
      }

    searchPostsHandler = e => {
    const posts = this.state.procs.filter(p => {
        if (p.procedure_name.includes(e.target.value)) {
        return p;
        }
    });
    this.setState({ filteredProcs: posts });
    };
    
    render() {
        return (
        <div>
            <input type="text"
                placeholder="Procedure"
                onKeyDown={this.searchProcsHandler}
            />
        </div>
        )
  }
}

export default Search
