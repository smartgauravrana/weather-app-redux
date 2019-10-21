import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/search/SearchComponent';
import SearchResult from './components/searchResult/SearchResult';
import PreviousSearches from './components/previousSearches/PreviousSearches';
import { debounce } from './utils/util';
import * as actions from './store/actions/weather';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchData: {
        searchTerm : '',
        type: 'name'
      }
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.fetchResults = debounce(this.fetchResults, 500);
  }

  handleSearch(event){
    const name = event.target.name;
    const value = event.target.value;
    const updatedSearchData = { ...this.state.searchData, [name]: value};
    this.setState({ searchData: updatedSearchData});
  }
  
  fetchResults() {
    this.props.fetchWeather(this.state.searchData);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.searchData !== prevState.searchData){
      if(this.state.searchData.searchTerm !== '')
        this.fetchResults();
    }
  }

  render() {
    return (
      <div className="App">
        <SearchComponent
          type={this.state.searchData.type}
          value={this.state.searchData.searchTerm}
          handleSearch={this.handleSearch}/>
        <SearchResult weatherData={this.props.weather}/>
        <PreviousSearches pastSearches={this.props.pastSearches}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather.data,
    pastSearches: state.weather.pastSearches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: (searchData) => dispatch(actions.fetchWeather(searchData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
