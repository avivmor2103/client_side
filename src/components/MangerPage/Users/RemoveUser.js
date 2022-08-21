import React,{useState} from 'react';
import RemoveUserForm from './RemoveUserForm';
import './RemoveUser.css';

const RemoveUser = (props) => {
    const [isEditing , setIsEditting] = useState(false);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    return (
        <div className='remove-user-container'>
            {!isEditing && <button onClick={startEditingClickHandler}>Delete User</button>}
            {isEditing && <RemoveUserForm onCancelClick={onCancelClickHandler}/>} 
        </div>
    );
}
 
export default RemoveUser;