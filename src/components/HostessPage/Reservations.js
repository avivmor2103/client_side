import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Hostess.css";
import './Reservations.css';
import axios from "axios";

const Reservations = (props) => {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [LastName, setLastName] = useState("");
  const [seatChanges, setSeatChanges] = useState("");
  const [email, setEmail] = useState("");
  const form = useRef();

  const changeNumSeats = (event) => {
    setSeatChanges(event.target.value);
    props.numberOfPeople(seatChanges);
  };

  const changePhoneNumber = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };

  const changeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const changeLastName = (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };
  const changeFirstName = (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    const url = 'http://localhost:3001/api/reservations/create';
    const body = {
      numTable: props.numTable,
      date: props.Date,
      hour: props.hour,
      numGuests: props.numberOfPeople,
      firstName: firstName,
      lastName: LastName,
      phoneNumber: phoneNumber,
      email:email
    }

    const createNewReservation= async()=>{
      try{
        const response = await axios.post(url, body);
        return <div>{response.data}</div>
      }catch(e){
        console.log(e);
      }
    }

    createNewReservation();

    emailjs
      .sendForm(
        "service_lwt0rys",
        "template_gctmto4",
        form.current,
        "5kAQEhWNY3WJKV0UE"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setFirstName("");
    setPhoneNumber("");
    setLastName("");
    setSeatChanges("");
    setEmail("");
  };

  const Cancle = () => {
    props.tableClicked(false);
  };

  return (
    <form
      ref={form}
      onSubmit={SubmitHandler}
      className="form-reservation"
      id="show"
    >
      <div>
        <div className="reservation-title">Reservation</div>
        <div className="form-div">
          <label className="form-label"> Table Id</label>
          <input
            type="text"
            readOnly={true}
            value={props.numTable}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">No. guestes</label>
          <input
            type="string"
            name="guests"
            readOnly={true}
            value={props.numberOfPeople}
            onChange={changeNumSeats}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">Date</label>
          <input
            type="text"
            name="Date"
            readOnly={true}
            value={props.Date}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">Start Hour</label>
          <input
            type="text"
            readOnly={true}
            name="hour"
            value={props.hour}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={firstName}
            name="to_name"
            onChange={changeFirstName}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={LastName}
            onChange={changeLastName}
            className="form-input"
          />
        </div>

        <div className="form-div">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={changePhoneNumber}
            className="form-input"
          />
        </div>

        <div className="form-div">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={changeEmail}
            className="form-input"
          />
        </div>
        <div className="btn-container">
          <button type="button" onClick={Cancle}>
            cancle
          </button>
          <button type="submit">submit</button>
        </div>
      </div>
    </form>
  );
};

export default Reservations;
