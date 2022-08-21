import React from "react";
import './TablePage.css';
import './TopComponent.css';


const TopComponent = (props) => {
    let avgPerDiner =  parseInt(props.amount)/parseInt(props.diners);
    return (
        <div className='top-container-div'>
            <div className="header-container">
                <button onClick={props.onReturn}>Home</button>
                <div className="top-header-div">Table {props.numTable}</div>
            </div>
            <div className="top-labels">
                <label className="label-class">Number Diners: {props.diners}</label>
                <label className="label-class">Number seats:{props.seats}</label>
                <label className="label-class">Average per diner: {avgPerDiner}</label>
            </div>
            <hr/>
        </div>
    );
}

export default TopComponent;