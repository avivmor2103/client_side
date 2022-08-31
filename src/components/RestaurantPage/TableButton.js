import React from "react";
import './TableButton.css';


const TableButton = (props) =>{    
    const handleTableClick = (event) => {
        props.onClickTable(props.table);
        
    }

    return(
        <button className="btn" onClick={handleTableClick}>
            {props.table.num_table}
        </button>
    );
}

export default TableButton;