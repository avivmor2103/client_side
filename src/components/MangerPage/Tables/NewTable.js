import React, {useState} from 'react';
import TableForm from './TableForm';
import './NewTable.css';

const NewTable = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    return (
        <div className="new-table-container">
            {!isEditing && <button onClick={startEditingClickHandler}>Add New Table</button>}
            {isEditing && <TableForm onCancelClick={onCancelClickHandler}/>} 
        </div>
    )
}
 
export default NewTable;