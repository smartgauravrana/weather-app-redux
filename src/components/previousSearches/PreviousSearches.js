import React from 'react';
import './PreviousSearches.css';

const PreviousSearches = ({ pastSearches }) => {
    
    return pastSearches && (<div className="PreviousSearches">
            <p className="past-search-title">Past searches:</p>
            <div className="Search-list-container">
                {
                    pastSearches.map((item, index) => (
                        <div 
                            className="list-item"
                            key={index}>
                            {item.city}: <br />
                            <span className="temp">{item.temp}&deg;C</span>
                        </div>
                    ))
                }
            </div>
            </div>);            
}

export default PreviousSearches;