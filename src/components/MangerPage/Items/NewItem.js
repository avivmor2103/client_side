import React, {useState} from 'react';
import ItemForm from './ItemForm';
import './NewItem.css';

const NewItem = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    return (
        <div className='new-item-container'>
            {!isEditing && <button onClick={startEditingClickHandler}>Add New Item</button>}
            {isEditing && <ItemForm onCancelClick={onCancelClickHandler}/>} 
        </div>
    )
}
  
 export default NewItem;