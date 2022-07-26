import React from "react";
import './TablePage.css';
import './TopComponent.css';


const TopComponent = (props) => {
    return (
        <div className='top divs'>
            <h2>Table {props.numTable}</h2>
            <div className="top-labels">
                <label>Number Diners: {}</label>
                <label>Number seats: {}</label>
                <label>Average per diner: {}</label>
            </div>
        </div>
    );
}

export default TopComponent;