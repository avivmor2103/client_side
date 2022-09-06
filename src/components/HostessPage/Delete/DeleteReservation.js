import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteReservation.css";
import ShowReservationToDelete from "./ShowReservationToDelete";

const DeleteReservation = () => {
  const [email, setEmail] = useState("");
  const [Date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hour, setHour] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [redervationDetailsToDelete, setRedervationDetailsToDelete] = useState(
    {}
  );

  const navigate = useNavigate();



  const phoneNumberHandler = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };


  const firstNameHandler = (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };


  const SubmitHandler = (event) => {
    event.preventDefault();
    const redervationDetailsToDelete = {
      firstName: firstName,
      lastName: lastName,
      Date: Date,
      hour: hour,
      email: email,
      phoneNumber: phoneNumber,
    };

    setRedervationDetailsToDelete(redervationDetailsToDelete);
    setIsSearchClicked(true);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          back
        </button>
      </div>
      <div>
        <form className="form-reservation" onSubmit={SubmitHandler}>
          <div className="reservation-title">Delete Reservation</div>

          <div className="form-div">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="to_name"
              className="form-input"
              onChange={firstNameHandler}
            />
          </div>
          <div className="form-div">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              onChange={lastNameHandler}
            />
          </div>

          <div className="form-div">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              onChange={phoneNumberHandler}
            />
          </div>
          <div className="btn-container">
            <button type="submit">delete</button>
          </div>
        </form>
      </div>
      {isSearchClicked && (
        <ShowReservationToDelete
          redervationDetailsToDelete={redervationDetailsToDelete}
        />
      )}
    </div>
  );
};

export default DeleteReservation;
