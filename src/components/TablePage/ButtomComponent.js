import React, {useState} from "react";
import './TablePage.css';


const ButtomComponent = (props) =>{ 
    const [state , setState] = useState({
        numTable : props.tableNumber,
        numSeats : '',
        numDiners: 0
    });


    const onClickHomeHandler= (props)=>{
        
    }

    return(
        <div className="divs down-labls">
            <div>
                <h4><b>Table Detailes : {state.numTable}</b></h4>
                <div>
                    <label>                    
                        <b>
                        Number Diners: {state.numDiners}
                        </b>
                    </label>
                        <br/>
                    <label>
                        <b>
                        Number Seats : {state.numSeats}
                        </b>
                    </label>
                </div>
            </div>
            <div>
                <div>
                    <label>Order</label>
                </div>
                <div>
                    <label>Dishes</label>
                </div>
            </div>
            <div>
                <label>
                    <b>
                        Total Check :
                    </b>
                </label>
                <button onClick={props.onReturn}>HOME</button>
            </div>
        </div>  
    );
}

export default ButtomComponent;