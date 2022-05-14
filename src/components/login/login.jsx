import React, { Component } from 'react';
import './login.css';
// import {useNavigation} from 'react-router-dom';

class Login extends Component{
    state = {
        email : "",
        password : "",
        msg : "" 
    };
    constructor(){
        super();
       
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
    }

    handleLoginClick = async () => {
        // const navigate = useNavigation();
        const login_data = {email:this.state.email ,password:this.state.password };
		const response = await fetch('http://localhost:3000/api/user/login',
            {
                method: 'post',
                body:  JSON.stringify(login_data) ,
                headers: { 'Content-Type': 'application/json'}
            });
        console.log(response.status);
        if (response.status === 200) {
            // this.setState({msg:'logined succesfully'});
			// const object = (await response.json());
			// setCookie('token',object.token);
			// setCookie('id',object.user.id);
			// setCookie('admin',object.admin);
			// <Navigate to="/home" />
            window.location.href= "http://localhost:3001/";
            // navigate("/home", { replace: true });
            // console.log("Submitted to the system");
        }
		else{
			const error = await response.text();
			this.setState({msg:error});
		}
    }

    handleRegisterClick = () =>{
        console.log("Going to reggister in the system");
    }

    handleChangeEmail = event =>{
        const value = event.target.value;
        this.setState({ email : value });
    }

    handleChangePassword = event => {
        const value = event.target.value;
        this.setState({ password : value });
    }

    handleChangeMsg = event => {
        const value = event.target.value;
        this.setState({ password : value });
    }

    render() { 
        return(
            <div id= 'box'>
                {/* <h1>Restaurant Managment System</h1>
                <hr></hr> */}
                <div className="login_component">
                    <h2 className="headers"><b>Login - Page</b> </h2>
                    <hr></hr>
                    <div>
                        <div className ="element">
                            <input value = {this.state.email} onChange={this.handleChangeEmail} placeholder='Email'></input>
                        </div>
                        <div className ="element">
                            <input value ={this.state.password} onChange={this.handleChangePassword} placeholder='Password'></input>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <button className ="buttons" onClick={this.handleLoginClick}><b>Log-in</b></button>
                    </div>
                    <hr></hr>
                    <div>
                        <button className ="buttons" onClick={this.handleRegisterClick}><b>Register</b></button>
                    </div>                
                </div>
            </div>)
    }
}
 
export default Login;