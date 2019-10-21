import * as actionTypes from './actionTypes';
import { storeSearches, getApiUrl } from '../../utils/util';

export const fetchWeatherSuccess = (result) => {
    return {
        type: actionTypes.FETCH_WEATHER_SUCCESS,
        payload: result
    }
};

export const fetchWeatherFailed = () => {
    return { type: actionTypes.FETCH_WEATHER_FAILED };
};

export const fetchWeather = (searchData) => {
    return dispatch => {
        fetch(getApiUrl(searchData))
      .then(res => res.json())
      .then(
        (result) => {
          if(result.cod === 200){
              const data = {
                temp: result.main.temp,
                city: result.name,
                description: result.weather[0].description
              }
            storeSearches(data);
            dispatch(fetchWeatherSuccess(data));
        } else{
            dispatch(fetchWeatherFailed());
        }
        },
        (err) => {
            console.log(err);
            dispatch(fetchWeatherFailed());
        }
      );
    }
};