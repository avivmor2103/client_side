import React from "react";
import './TableButton.css'


const TableButton = (props) =>{
    
    const [state , setState] = React.useState({
        numTable : props.table.num_table,
    });
    const handleTableClick = (event) => {
        console.log(state.numTable);
        props.onClickTable(state.numTable);
    }

    return(
        <div>
            <button onClick={handleTableClick}>Table #{state.numTable}</button>
        </div>
    );
}

export default TableButton;