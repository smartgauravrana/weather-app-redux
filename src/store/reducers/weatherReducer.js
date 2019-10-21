import * as actionTypes from '../actions/actionTypes';

const pastSearches = localStorage.getItem('pastSearches')?JSON.parse(localStorage.getItem('pastSearches')): null;
const initialState = {
    data: {},
    pastSearches: pastSearches
};

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case actionTypes.FETCH_WEATHER_SUCCESS:  
            const pastSearches = localStorage.getItem('pastSearches') ?
                JSON.parse(localStorage.getItem('pastSearches')): null;
            return {
                ...state, 
                data: {...payload},
                pastSearches: pastSearches
            };
        case actionTypes.FETCH_WEATHER_FAILED:  return {
            ...state,
            data: {}
        };
        default: return state;
    }
}

export default reducer;