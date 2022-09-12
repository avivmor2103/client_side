import React from 'react';
import './TableCard.css';
const TableCard = (props) => {
    const onClickHandler = () =>{ 
        props.onClickDelete(props.data.num_table);
    }
    return (
        <div className='card'>
            {props.data.num_table}
            <button id="btn" onClick={onClickHandler}>X</button>
        </div>
    );
}
 
export default TableCard
