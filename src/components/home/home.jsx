import React from 'react';
import {default as axios} from 'axios';
import Cookies from 'js-cookie';
import AuthApi from '../../AuthApi.js';
 
const HomePage = () => {

    const [state , setState] = React.useState({
        table :"",
        erea : "" ,
    });
    const Auth = React.useContext(AuthApi);

    const chooseEreaClick = event => {
        console.log("Here");
        const value = event.target.value;
        console.log(value);
        const newState = {
            ...state,
            erea : value};

        setState(newState); 
        console.log(newState);
        const ereaType = { erea : state.erea };
        const url = 'http://localhost:3001/api/tables/get/' + 2 ;
        // const config={   
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }

        const ereaTables = async () => {
            const response = await axios.get(url);
            console.log(response.data);
        //     let botton = document.createElement("botton").value(response.data.num_seats);
        //     document.getElementById('tables-bottons').appendChild(botton);
        }
        ereaTables();
    }
    
    const logoutHandleClick = ()=> {
      
        Auth.setAuth(false);
        Cookies.remove("user");

    }
    
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
            <div id='tables-bottons'>

            </div>
        </div>  
    );
};

export default HomePage ;