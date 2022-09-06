import React from 'react'
import './Card.css'
const Card = (props ) =>{

    

    const onCancleItem =()=> {
        props.onDelete(props.item);
        return;
    }

    const setlabelvalue = (event)=>{
        props.setLabel(event.target.value);
    }

    return(
        <div className='card'> 
            <div>{props.name}</div>
            <div>{props.price}</div> 
            <input type="number" max="5" min="1" step="1" defaultValue="1" onChange={setlabelvalue}/>
            <div className='x-button-container'>
                <button className='x-cancle-btn' onClick={onCancleItem}>X</button>
            </div>
        </div>
    )
}

export default Card;