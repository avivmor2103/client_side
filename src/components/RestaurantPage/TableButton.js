import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './TableButton.css';


const TableButton = (props) =>{
    
    const [numTable , setNumTable] = React.useState(props.table.num_table);
    const [numSeats, setNumSeats] = useState(props.table.num_seats);
    
    const handleTableClick = (event) => {
        //console.log(props.table);
        props.onClickTable(props.table);
        
    }

    return(
        <button onClick={handleTableClick}>
            {numTable}
        </button>
    );
}

export default TableButton;