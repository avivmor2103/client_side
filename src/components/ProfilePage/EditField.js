import React, {useState} from 'react';
import FieldForm from './FieldForm';
import './EditField.css';

const EditField = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }
  
    return ( 
        <div className='new-field-container'>
            {!isEditing && 
                <div className='field-element-container'>
                    <div>{props.field}:   {props.userData}</div>
                    <button onClick={startEditingClickHandler}>Edit</button>
                </div>
            }
            {isEditing && <FieldForm onCancelClick={onCancelClickHandler} field={props.field} data={props.userData} user={props.data}/>} 
        </div>
    );
}
 
export default EditField;