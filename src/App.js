import React, { Component } from 'react';
import './App.css';
import SearchComponent from './components/search/SearchComponent';
import SearchResult from './components/searchResult/SearchResult';
import PreviousSearches from './components/previousSearches/PreviousSearches';
import { storeSearches } from './utils/util';

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const appid = "ec47d63069c21ed12986935455305b1a"

class App extends Component {

  constructor(props){
    super(props);
    const pastSearches = localStorage.getItem('pastSearches')?JSON.parse(localStorage.getItem('pastSearches')): null;
    this.state = {
      weatherData: {},
      searchData: {},
      pastSearches: pastSearches
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchQuery){
    this.setState({searchData: searchQuery});
  }

  getApiUrl() {    
    const searchTerm = this.state.searchData.searchTerm;
    let url;
    if(this.state.searchData.type === 'name'){
      url = `${BASE_URL}?q=${searchTerm}&units=metric&appid=${appid}`;
      } else if(this.state.searchData.type === 'location'){        
        url = `${BASE_URL}?lat=${searchTerm.split(' ')[0]}&lon=${searchTerm.split(' ')[1]}&units=metric&appid=${appid}`;
      }else{
        url = `${BASE_URL}?zip=${searchTerm},in&units=metric&appid=${appid}`;
      }
      return url;
  }

  setPastSearches(){
    const pastSearches = JSON.parse(localStorage.getItem('pastSearches'));
    this.setState({ pastSearches: pastSearches });
  }

  fetchResults() {
    fetch(this.getApiUrl())
      .then(res => res.json())
      .then(
        (result) => {
          if(result.cod === 200){
            this.setState({ weatherData: { 
            temp: result.main.temp,
            city: result.name,
            description: result.weather[0].description
          }}, () => {
            storeSearches(this.state.weatherData);
            this.setPastSearches();
          });

        }
        },
        (err) => console.log(err)
      );
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
        <SearchComponent handleSearch={this.handleSearch}/>
        <SearchResult weatherData={this.state.weatherData}/>
        <PreviousSearches pastSearches={this.state.pastSearches}/>
      </div>
    )
  }
}

export default App;
