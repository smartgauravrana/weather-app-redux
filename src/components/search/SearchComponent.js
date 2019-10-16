import React, { Component } from 'react';
import './SearchComponent.css'

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm : '',
            type: 'name'
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name] : value}, () => {
            this.props.handleSearch(this.state);
        });        
    }

    render(){
        return <p>
                <input 
                    name="searchTerm" 
                    type="text" 
                    value={this.state.searchTerm} 
                    onChange={this.handleChange}/>
                <select name="type" value={this.state.type} onChange={this.handleChange}>
                    <option value="name">Name</option>
                    <option value="location">Lat/Long</option>
                    <option value="zipcode">ZipCode</option>
                </select>
                    </p>
    }
};

export default SearchComponent;