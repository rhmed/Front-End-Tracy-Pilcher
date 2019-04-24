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
        this.setState({ procs: dummyData });
      }

    searchPostsHandler = e => {
    const posts = this.state.posts.filter(p => {
        if (p.username.includes(e.target.value)) {
        return p;
        }
    });
    this.setState({ filteredPosts: posts });
    };
    
    render() {
        return (
        <div>
            <input type="text"
                placeholder="Enter 5 digit zip"
                onKeyDown={this.searchProcsHandler}
            />
        </div>
        )
  }
}

export default Search
