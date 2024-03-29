import React from "react";
import './ItemButton.css';
const ItemButton = props => { 

    const handleChoosenItem = (event) => {
        const enteredItem = {
            name: props.value.item_name,
            price: props.value.item_price,
            id: props.value.item_id,
            category: props.value.item_category
        }
        //console.log(enteredItem);
        props.onAddItem(enteredItem);
    };

    return (
        <button id="item-btn" onClick={handleChoosenItem}>{props.value.item_name}</button>
    )
}

export default ItemButton;