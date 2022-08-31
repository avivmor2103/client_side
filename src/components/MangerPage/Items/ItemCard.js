import React from 'react';
import './ItemCard.css';
const ItemCard = (props) => {

    const onClickHandler = () =>{
        console.log(props.item.item_id);
        props.onDeleteClick(props.item.item_id);
    }

    return ( 
        <div className='card-item-container'>
            <div>
                {props.item.item_name}
            </div>
            <div className='button-active-item-container'>
                <button onClick={onClickHandler}>Delete</button>
                <button>Update</button>
                <button>Disable</button>
            </div>
            

        </div>
     );
}
 
export default ItemCard;