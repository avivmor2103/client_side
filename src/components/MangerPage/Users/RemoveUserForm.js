import axios from 'axios';
import React, {useState} from 'react';
import './RemoveUserForm.css';

const RemoveUserForm = (props) => {

    const [enteredUserId , setUserId]= useState('');


    const userIdChangeHandler= (event)=>{
        setUserId(event.target.value); 
    };

    const submitHandler = (event)=>{
        event.preventDefault();

        const url = 'http://localhost:3001/api/user/delete/'+ enteredUserId; 

        const deleteUser = async () =>{ 

            try{
                const response = await axios.delete(url);
                if(response.status === 200)
                {
                    console.log(`User ${enteredUserId} deleted successfully`);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        deleteUser();
        setUserId('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='cancel-user_controls'>
                <div className='cancel-user_control'>
                    <label>User Id</label>
                    <input type='text' value={enteredUserId} onChange={userIdChangeHandler}/>
                </div>
            </div>
            <div className='cancel-user_actions'>
                <button type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button type= "submit">Delete User</button>
            </div>
    </form>
    );
}
 
export default RemoveUserForm;