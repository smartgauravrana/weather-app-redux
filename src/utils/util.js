export const storeSearches = (data) => {
    let pastSearches = [];
    if(localStorage.getItem('pastSearches')){
        pastSearches = JSON.parse(localStorage.getItem('pastSearches'))
        if(pastSearches.length === 3){
            pastSearches = pastSearches.slice(1);
            pastSearches.push(data);
        } else{
            pastSearches.push(data);
        }
    } else {
        pastSearches.push(data)
    }
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
}

export const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        const context = this;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

export const getApiUrl = (searchData) => {
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    const appid = process.env.REACT_APP_WEATHER_API_KEY;
    const searchTerm = searchData.searchTerm;
    let url;
    if(searchData.type === 'name'){
      url = `${BASE_URL}?q=${searchTerm}&units=metric&appid=${appid}`;
      } else if(searchData.type === 'location'){        
        url = `${BASE_URL}?lat=${searchTerm.split(' ')[0]}&lon=${searchTerm.split(' ')[1]}&units=metric&appid=${appid}`;
      }else{
        url = `${BASE_URL}?zip=${searchTerm},in&units=metric&appid=${appid}`;
      }
      return url;
  }