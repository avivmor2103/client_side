import React from 'react';
import  './UserButton.css';

const UserButton = (props) => {
    const onclickHandler = ()=>{
        props.onDeleteClick(props.data.id);
    }
    return (
        <div className='user-delete-container'>
            {props.data.first_name} {props.data.last_name}
            <button id='btn-x' onClick={onclickHandler}>X</button>
        </div>
    );
}
 
export default UserButton;