import React,{useState} from "react";
import {default as axios} from 'axios';
import './RegistrationPage.css';

const RegistrationPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [msg, setMsg] = useState('');

  const onChangeFirstNameHandler= (event) => {
    let value = event.target.value;
    setFirstName(value);
  }

  const onChangeLastNameHandler= (event) => {
    let value = event.target.value;
    setLastName(value);
  }

  const onChangeEmailHandler= (event) => {
    let value = event.target.value;
    setEmail(value);
  }

  const onChangeIdHandler= (event) => {
    let value = event.target.value;
    setId(value);
  }

  const onChangeAddressHandler= (event) => {
    let value = event.target.value;
    setAddress(value);
  }

  const onChangePhoneNumberHandler= (event) => {
    let value = event.target.value;
    setPhoneNumber(value);
  }

  const onChangeDateHandler= (event) => {
    let value = event.target.value;
    setDate(value);
  }

  const onChangePasswordHandler= (event) => {
    let value = event.target.value;
    setPassword(value);
  }

  const onChangePositionHandler= (event) => {
    let value = event.target.value;
    setPosition(value);
  }

  const onSubmitHandler = (event) => {
    const newUserDataRequest = {
      first_name : firstName,
      last_name : lastName,
      email : email,
      personal_id :id,
      address : address,
      phone_number : phoneNumber,
      date_of_birth : date,
      password : password,
      position : position
    }

    if(firstName === '' || lastName === '' || email ==='' || id === '' || address === '' || phoneNumber=== '' || date === '' || password==='' || position==='')
    {
      setMsg('Missing details');
      return;
    }

    const url = 'http://localhost:3001/api/user/create';

    const config={   
      headers:{
          'Content-Type':'application/json'
      }
    }

    const sleep = (ms)=> {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

    const registerRequest= async()=> {
      try{
        const body = JSON.stringify(newUserDataRequest);
        const response = await axios.post(url, body, config);
        if(response === 200)
        {
          console.log(`Wellcome ${firstName}${ lastName}- Your registration has been successfully received.`);
          setMsg(`Wellcome ${firstName}${ lastName}- Your registration has been successfully received.`);
          await sleep(3000);
          props.onReturnToLoginPageClick();
        }else{
          const error = await response.text();
          setMsg({msg : error});
        }
      }catch(e){
        console.log(e);
      }

    }
    registerRequest();
  }

  return (
    <div id="box">
      <form className="registration_component" onSubmit={onSubmitHandler}>
        <div className="title">Registration</div>
        <div className="element-container">
          <div className="div-row">
            <input className="name-element" placeholder="First Name" onChange={onChangeFirstNameHandler}></input>
            <input className="last-element" placeholder="Last Name" onChange={onChangeLastNameHandler}></input>
          </div>
          <div className="div-row">
            <input className="email-element" placeholder="Email" onChange={onChangeEmailHandler}></input>
            <input className="id-element" placeholder="ID" onChange={onChangeIdHandler}></input>
          </div>
          <div className="div-row">
            <input className="address-element" placeholder="Address" onChange={onChangeAddressHandler}></input>
            <input className="phone-element" placeholder="Phone-Number" onChange={onChangePhoneNumberHandler}></input>
          </div>
          <div className="div-row">
            <input className="date-element" placeholder="Date of birth" onChange={onChangeDateHandler}></input>
            <input className="password-element" type="password" placeholder="Password" onChange={onChangePasswordHandler}></input>
          </div>
          <div className="div-row">
            <input className="position-element" placeholder="Position" onChange={onChangePositionHandler}></input>
          </div>
          <div className="msg-container">
            <span placeholder="msg">{msg}</span>
          </div>
        </div>
        <div className="buttons-container">
          <button className="register-button" type="submit">Register</button>
          <button className="back-button" onClick={props.onReturnToLoginPageClick}>Back</button>
        </div>
      </form>
    </div>
  );
};

/*
  first_name 
  last_name ;
  email ;
  personal_id ;
  address  ;
  phone_number ;
  date_of_birth ;
  password ;
  position ;
  status ;
*/

export default RegistrationPage;
