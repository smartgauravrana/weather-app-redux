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
        const placeholder = this.state.type === 'name'? 'e.g. Karnal': (this.state.type === 'location'? 'e.g. 76.91 65.32': 'e.g. 122001');

        return <p>
                <input 
                    name="searchTerm" 
                    type="text" 
                    placeholder={placeholder}
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