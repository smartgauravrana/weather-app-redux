import React from 'react';
import './PreviousSearches.css';

const PreviousSearches = ({ pastSearches }) => {
    
    return (
            <div className="Search-list-container">
                {
                    pastSearches && pastSearches.map((item, index) => (
                        <div 
                            className="list-item"
                            key={index}>
                            {item.city}: <br />
                            <span className="temp">{item.temp}&deg;C</span>
                        </div>
                    ))
                }
            </div>
    );    
}

export default PreviousSearches;