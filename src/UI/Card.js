import React from 'react'
import './Card.css'
const Card = (props ) =>{
    const onCancleItem =()=> {
        props.onDelete(props.item);
        return;
    }
    return(
        <div className='card'>
            <div>{props.name}</div>
            <div>{props.price}</div> 
            <div className='x-button-container'>
                <button className='x-cancle-btn' onClick={onCancleItem}>X</button>
            </div>
        </div>
    )
}

export default Card;