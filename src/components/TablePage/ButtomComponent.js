import React, {useState} from "react";
import './TablePage.css';


const ButtomComponent = (props) =>{ 
    const [state , setState] = useState({
        numTable : props.tableNumber,
        numSeats : '',
        numDiners: 0
    });


    const onClickSendItems = ()=>{
        props.onSendClick();
    }

    const onClickCheckTable = ()=>{
        props.onCheckClick ();
    }

    return(
        <div className="bottom-div-container">
                <div className="total-amout-container">Total Check : {props.total}</div>
                <button onClick={onClickSendItems}> Send </button> 
                <button onClick={onClickCheckTable}> Check </button>

        </div>  
    );
}

export default ButtomComponent;