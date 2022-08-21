import React, {useState} from 'react';
import RemoveForm from './RemoveForm';
import './RemoveTable.css';
const RemoveTable = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    return (
        <div className="delete-table-container">
            {!isEditing && <button onClick={startEditingClickHandler}>Delete Table</button>}
            {isEditing && <RemoveForm onCancelClick={onCancelClickHandler}/>} 
        </div>
    )
} 
export default RemoveTable;