import React,{useState} from 'react';
import axios from 'axios';
import RemoveUserForm from './RemoveUserForm';
import './RemoveUser.css';

const RemoveUser = (props) => {
    const [isEditing , setIsEditting] = useState(false);
    const [usersArray , setUsersArray] = useState([]);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
        
        const url = 'http://localhost:3001/api/user/all_users/';
        const getAllUsers = async () =>{ 
            try{
                const response = await axios.get(url);
                if(response.status === 200)
                {
                    console.log("Get all user done successfully");
                    console.log(response.data);
                    setUsersArray(response.data);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        getAllUsers();

    }

    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    const updateUserStateHandler= (newUsers)=>{
        setUsersArray(newUsers);
    }

    return (
        <div className='remove-user-container'>
            {!isEditing && <button className='btn' onClick={startEditingClickHandler}>Delete User</button>}
            {isEditing && <RemoveUserForm onCancelClick={onCancelClickHandler} users={usersArray} updateUserState={updateUserStateHandler}/>} 
        </div>
    );
}
 
export default RemoveUser;