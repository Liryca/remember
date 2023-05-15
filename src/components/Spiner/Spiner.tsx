import React from 'react';
import './Spiner.css';

const Spiner:React.FC = () => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
               
            </div>
            <p>dictionary is loading...</p>
        </div>
      );
};

export default Spiner;