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

    const url = process.env.REACT_APP_API_PATH + '/user/create';

    const config={   
      headers:{
          'Content-Type':'application/json'
      }
    }

    const registerRequest= async()=> {
      try{
        const response = await axios.post(url, newUserDataRequest,config);
        if(response.status === 201)
        {
          setMsg(response.data);
          props.onReturnToLoginPageClick();
        }
        if(response.data === 200){
          console.log(response);
          setMsg(response.data);
        }
      }catch(e){
        console.log(e);
      }

    }
    registerRequest();
  }

  const selectOptionPositionHandler = (event) =>{
    if(event.target.value === "Select")
    {
      return;
    }else{
      setPosition(event.target.value);
    }
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
            <input className="email-element" placeholder="Email" type="email" onChange={onChangeEmailHandler}></input>
            <input className="id-element" placeholder="ID" onChange={onChangeIdHandler}></input>
          </div>
          <div className="div-row">
            <input className="address-element" placeholder="Address" onChange={onChangeAddressHandler}></input>
            <input className="phone-element" placeholder="Phone-Number" onChange={onChangePhoneNumberHandler}></input>
          </div>
          <div className="div-row">
            <input type="date" min="1990-01-01" max="2005-01-01" className="date-element" placeholder="Date of birth" onChange={onChangeDateHandler}></input>
            <input className="password-element" type="password" placeholder="Password" onChange={onChangePasswordHandler} autoComplete="new-password"></input>
          </div>
          <div className="div-row">
            {/* <input className="position-element" placeholder="Position" onChange={onChangePositionHandler}></input> */}
            <select className="position-element" onClick={selectOptionPositionHandler}>
              <option className='selection-option'>Select</option>
              <option className='selection-option'>Manager</option>
              <option className='selection-option'>Chef</option>
              <option className='selection-option'>Bartender</option>
              <option className='selection-option'>Waiter</option>
              <option className='selection-option'>Host</option>
              <option className='selection-option'>Cook</option>
            </select>
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
