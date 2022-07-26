import AuthApi from '../../AuthApi.js';
import './home.css';
import React from 'react';
import {default as axios} from 'axios';
import Cookies from 'js-cookie';
import TableButton from './TableButton';

const RestaurantPage = (props) => {

    const [state , setState] = React.useState({
        table :"",
        erea : "" ,
        tablesArray : [],
        tableDate : false
    });
    const Auth = React.useContext(AuthApi);

    const chooseEreaClick = event => {
        const value = event.target.value;
        if(value === '0')
            return;
        // const parent = document.getElementById('tables-bottons');
        
        // removeAllChildNodes(parent);
        const newState = {
            ...state,
            erea : value, tablesArray : []
        };

        setState(newState);
        const ereaType = { erea : newState.erea };
        //console.log(ereaType);
        const url = 'http://localhost:3001/api/tables/erea/' + ereaType.erea ;
        //console.log(url);
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }

        const ereaTables = async () => {
            try{
                const response = await axios.get(url , config);
                const newState = {
                    ...state,
                    tablesArray :  response.data 
                };
                setState(newState);
                //response.data.map((table) => <TableButton numTable={table.num_table}/>);
            }catch(e){
                console.log(e);
            }
        }  
        ereaTables();
    }

    
    const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    const logoutHandleClick = ()=> {
        const userEmail = Cookies.get("user");
        //console.log(userEmail) ;

        const requestBody = {email : userEmail};
        const url = 'http://localhost:3001/api/user/logout';
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }

        
        const logoutRequest = async () => {

            try {
                const body = JSON.stringify(requestBody);
                const response = await axios.post( url, body , config );
                if (response.status === 200) {
                    Auth.setAuth(false);
                    Cookies.remove("user");
    
                    const newState = {
                        ...state,
                        msg:'Loged-out succesfully'
                    };
    
                    setState(newState);
                    console.log("Disconnected from the system");
                  
                }else{
                    const error = await response.text();
                    setState({msg : error});
                }
            } catch(e) {
                console.log(e);
            }
        }
        logoutRequest();
    }

    const handlerTableClicked = (numTable) => {
        console.log(numTable);
        props.onSwitchTable(numTable);
    }
    
    return(
        <div className='home-component'>
           
            <div className='top-component' >
                <div className="home-header">
                    <h2>Tabit-App</h2>
                </div>
                <div>   <button onClick={logoutHandleClick}>Log-out</button>
                </div>
            </div>
            <hr/>
            <div>
                <h3>Select Erea</h3>
                <select onClick={chooseEreaClick}>
                    <option value="0"></option>
                    <option value="1">Floor</option>
                    <option value="2">Bar</option>
                    <option value="3">Garden</option>
                    <option value="4">Terrace</option>
                </select>
            </div>
            <hr/>
            <div id='bottons-container'>
                {state.tablesArray.map((tableNumber, index) => {
                    return <TableButton table = {tableNumber} key={index} onClickTable={handlerTableClicked} />
                })}
            </div>
        </div>
    );
};

export default RestaurantPage ;