import React from 'react';
import {default as axios} from 'axios';
import history from '../../history.js' ;
import Cookies from 'js-cookie';
import AuthApi from '../../AuthApi.js';
 
const HomePage = () => {

    const [state , setState] = React.useState({
        table :"",
        erea : "" ,
    });
    const Auth = React.useContext(AuthApi);

    const chooseEreaClick = event => {
        const value = event.target.value;
        const newState = {
            ...state,
            erea : value};

        setState(newState); 

        const ereaType = { erea : state.erea };
        const url = 'http://localhost:3001/api/tables/erea' ;
        // const config={   
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }

        const ereaTables = async () => {
            const body = JSON.stringify(ereaType);
            const response = await axios.get(url , body);
        }

        ereaTables();
    }

    const logoutHandleClick = ()=> {
      
        window.localStorage.setItem("auth","false");
        Cookies.remove("user");
    }

    console.log("Here");
    
    return(
        <div>
            <div className="home-header">
                <h2>Tabit-App</h2>
            </div>
            <div>
                <button onClick={logoutHandleClick}>Log-out</button>
            </div>
            <div>
                <h3>Select Erea</h3>
                <select onClick={chooseEreaClick}>
                    <option value=""></option>
                    <option value="1">Bar</option>
                    <option value="2">Floor</option>
                    <option value="3">Garden</option>
                    <option value="4">Terrace</option>
                </select>
            </div>
            <div>

            </div>
        </div>  
    );
};

export default HomePage ;