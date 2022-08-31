import axios from 'axios';
import React, {useState, useEffect} from 'react';
import EditField from './EditField';
import Cokies from 'js-cookie';
import './ProfilePage.css';

const ProfilePage = (props) => {

    const [ userName, setUserName] = useState('');
    const [ userData, setUserData] = useState('');
        
    useEffect(()=>{
        const url ='http://localhost:3001/api/user/all_users';
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        let users = []; 
        const getUsers = async ()=>{
            try{
                const response = await axios.get(url, config);
                if(response.status === 200)
                {
                    users = [...response.data];
                    const userEmail = Cokies.get("user");
                    const user = users.find( user =>  user.email === userEmail );
                    setUserName(user.first_name);
                    setUserData(user);
                }else{
                    console.log('Error');
                }
            }catch(e){
                console.log(e);
            }
        }
        getUsers();
        
    }, [userName]);


    return (

        <div className='profile-page-container'>
            <div className='profile-page-title'>{userName}'s Page</div>
            <EditField field='First Name' userData={userData.first_name} data={userData} />
            <EditField field='Last Name' userData={userData.last_name} data={userData}/>
            <EditField field='Email' userData={userData.email} data={userData}/>
            <EditField field='Password' userData={userData.password} data={userData}/>
            <EditField field='Id' userData={userData.id} data={userData}/>
            <EditField field='Date of Birth' userData={userData.date_of_birth} data={userData}/>
            <EditField field='Address' userData={userData.address} data={userData}/>
            <EditField field='Phone Number' userData={userData.phone_number} data={userData}/>
            <EditField field='Status' userData={userData.status} data={userData}/>
            <EditField field='Position' userData={userData.position} data={userData}/>
        </div>
    )
}


 
export default ProfilePage;