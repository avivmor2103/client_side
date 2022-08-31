import React, {useState} from 'react';
import RemoveItemForm from './RemoveItemForm';
import './RemoveItem.css';

const RemoveItem = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    return (
        <div className='remove-item-container'>
            {!isEditing && <button className="btn" onClick={startEditingClickHandler}>Delete Item</button>}
            {isEditing && <RemoveItemForm onCancelClick={onCancelClickHandler}/>} 
        </div>
    )
 }
  
 export default RemoveItem;