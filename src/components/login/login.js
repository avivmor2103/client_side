import React from 'react';
import './login.css';
import AuthApi from '../../store/AuthApi';
import {default as axios} from 'axios';
import Cookies from 'js-cookie';
import { FaUnlockAlt, FaUser} from "react-icons/fa";

const LoginPage = (props) => {
    const [ state, setState] =  React.useState({
        email : "",
        password : "",
        msg : "" 
    });

    const Auth = React.useContext(AuthApi) ;


    const handleLoginClick = () => {
        const loginData = {
            email : state.email,
            user_password : state.password 
        };
        const url = process.env.REACT_APP_API_PATH  + '/user/login';
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const loginRequest = async () => {

            try {
                const body = JSON.stringify(loginData);
                const response = await axios.post(url , body, config);
                if (response.status === 200) {
                    // const [auth, setAuth] = React.useState(false);
                    //console.log(Auth.auth);
                    Auth.setAuth(true);
                    Cookies.set("user" , state.email );
    
                    const newState = {
                        ...state,
                        msg:'logined succesfully'
                    };
    
                    setState(newState);
                    console.log("Submitted to the system");
                  
                }else{
                    const error = await response.text();
                    setState({msg : error});
                }
            } catch(e) {
                console.log(e);
            }
        }

        loginRequest();
    }

    const handleChangeEmail = event =>{
        const value = event.target.value;
        const newState = {
            ...state,
            email:value};

        setState(newState);
        
    }

    const handleChangePassword = event => {
        const value = event.target.value;
        const newState = {
            ...state,
            password:value};

        setState(newState);
    
    }

    const handleChangeMsg = event => {
        const value = event.target.value;
        
        const newState = {
            ...state,
            msg:value};

        setState(newState);
    }

    return(
        <div id="box">
            <div className="login_component">
                <div className="title">Login</div>
                <div className="element-container">
                    <div className='wrapper'>
                        <FaUser color="#AFB4FF"/>
                        <input 
                            className="email-element"
                            value={state.email} 
                            onChange={handleChangeEmail} 
                            placeholder='Email'>
                        </input>
                    </div>
                    <div className='wrapper'>
                        <FaUnlockAlt color="#AFB4FF"/>
                        <input
                            className="password-element"
                            value={state.password} 
                            type="password" 
                            onChange={(e) => handleChangePassword(e)} 
                            placeholder='Password'>
                        </input>
                    </div>
                    <div className="msg-container">
                        <span onChange={(e) => handleChangeMsg(e)} placeholder='msg'>{state.msg}</span>
                    </div>
                </div>
                <div className="buttons-container">
                <button className="login-button" onClick={handleLoginClick}>Log-in</button>
                <button className="register-button" onClick={props.onClickToRegistrationPage}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


    // return (
    //     <div id= 'box'>
    //             <div className="login_component">
    //                 <h2 className="headers"><b>Login - Page</b> </h2>
    //                 <hr></hr>
    //                 <div>
    //                     <div className ="element">
    //                         <input value={state.email} onChange={handleChangeEmail} placeholder='Email'></input>
    //                     </div>
    //                     <div className ="element">
    //                         <input value={state.password} type='password' onChange={(e) => handleChangePassword(e)} placeholder='Password'></input>
    //                     </div>
    //                     <div className ="element">
    //                         <span onChange={(e) => handleChangeMsg(e)} placeholder='msg'>{state.msg}</span>
    //                     </div>
    //                 </div>
    //                 <br/>
    //                 <div>
    //                     <button className ="buttons" onClick={handleLoginClick}><b>Log-in</b></button>
    //                 </div>
    //                 <hr></hr>
    //                 <div>
    //                     <button className ="buttons" onClick={handleRegisterClick}><b>Register</b></button>
    //                 </div>                
    //             </div>
    //         </div>
    // );