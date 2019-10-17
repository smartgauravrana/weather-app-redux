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
        this.props.handleSearch(event);  
    }

    render(){
        const placeholder = this.props.type === 'name'? 'e.g. Karnal': (this.props.type === 'location'? 'e.g. 76.91 65.32': 'e.g. 122001');

        return <p>
                <input 
                    name="searchTerm" 
                    type="text" 
                    placeholder={placeholder}
                    value={this.props.value} 
                    onChange={this.handleChange}/>
                <select name="type" value={this.props.type} onChange={this.handleChange}>
                    <option value="name">Name</option>
                    <option value="location">Lat/Long</option>
                    <option value="zipcode">ZipCode</option>
                </select>
                    </p>
    }
};

export default SearchComponent;