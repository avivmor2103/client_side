import axios from 'axios';
import React from 'react';
import './RemoveUserForm.css';
import UserButton from './UserButton';

const RemoveUserForm = (props) => {

    const onDeleteClickHandler = (id) =>{ 
        const url = process.env.REACT_APP_API_PATH + '/user/delete/'+ id; 

        const deleteUser = async () =>{ 

            try{
                const response = await axios.delete(url);
                if(response.status === 200)
                {
                    console.log(`User deleted successfully`);
                    console.log(response);
                    props.updateUserState(response.data);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        deleteUser();
    }

    return (
        <div className="remove-form-container">
            <div className='cancel-user_controls'>
                <div className='cancel-user_control'>
                    <label>Delete User</label>
                </div>
            </div> 
            <div className='users-container'>
                { props.users.map( (user, index) =>{ return <UserButton key={index} data={user} onDeleteClick={onDeleteClickHandler}/>}) }
            </div>
            <div className='cancel-user_actions'>
                <button onClick={props.onCancelClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default RemoveUserForm;