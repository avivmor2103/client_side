import React from "react";
import { useState } from "react";
import ShowReservationToUpdate from "./ShowReservationToUpdate";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const reservations = [
  {
    id: Math.random().toString(),
    numTable: "table3",
    numGuests: "3",
    reservationDate: "2022-09-11",
    reservationHour: "20:30",
    firstName: "yarden",
    lastName: "cohen",
    phoneNumber: "0548158012",
    clientEmail: "talaulr@gmail.com",
  },
  {
    id: Math.random().toString(),
    numTable: "table10",
    numGuests: "6",
    reservationDate: "2022-09-10",
    reservationHour: "18:00",
    firstName: "talia",
    lastName: "rint",
    phoneNumber: "0544252287",
    clientEmail: "talaulr@gmail.com",
  },
  {
    id: Math.random().toString(),
    numTable: "table12",
    numGuests: "3",
    reservationDate: "2022-09-09",
    reservationHour: "18:00",
    firstName: "ofek",
    lastName: "cohen",
    phoneNumber: "0546891120",
    clientEmail: "ofekcohen@gmail.com",
  },
];

const UpdateReservation = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [Date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [hour, setHour] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isNotExist, setIsNotExist] = useState(false);
  const [redervationDetailsToUpdate, setRedervationDetailsToUpdate] = useState(
    {}
  );
  let reservationFound;

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

  const calcByPhoneNumber = (reservationElem) => {
    const reservationPhoneNumber = reservationElem.phoneNumber;
    let resultPhoneNumber = phoneNumber.localeCompare(reservationPhoneNumber);
    if (resultPhoneNumber === 0) return true;
    else return false;
  };

  const calcByFirstName = (reservationElem) => {
    const reservationFirstName = reservationElem.firstName;
    let resultFirstName = firstName.localeCompare(reservationFirstName);
    if (resultFirstName === 0) return true;
    else return false;
  };

  const calcByLastName = (reservationElem) => {
    const reservationLastName = reservationElem.lastName;
    let resultLastName = lastName.localeCompare(reservationLastName);
    if (resultLastName === 0) return true;
    else return false;
  };

  const cheackIfReservationExist = (event) => {
    let indexReservation = 0;
    event.preventDefault();
    if (firstName && lastName) {
      for (
        indexReservation = 0;
        indexReservation < reservations.length;
        indexReservation++
      ) {
        if (calcByFirstName(reservations[indexReservation])) {
          if (calcByLastName(reservations[indexReservation])) {
            console.log("is the same first and last name");
            reservationFound = reservations[indexReservation];
            return true;
          }
        }
      }
    } else {
      if (phoneNumber) {
        for (
          indexReservation = 0;
          indexReservation < reservations.length;
          indexReservation++
        ) {
          if (calcByPhoneNumber(reservations[indexReservation])) {
            console.log("is the same first and last name");
            reservationFound = reservations[indexReservation];
            return true;
          }
        }
      }
    }
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    if (cheackIfReservationExist(event)) {
      const redervationDetailsToUpdate = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };

      setRedervationDetailsToUpdate(redervationDetailsToUpdate);
      console.log("this is from submit");
      console.log(reservationFound);
      setIsSearchClicked(true);
    } else {
      event.preventDefault();
      setIsSearchClicked(false);
      setIsNotExist(true);
      console.log("hii from error");
    }
    //else alert("the reservation isn't exist ");
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <form className="form-reservation" onSubmit={SubmitHandler}>
        <div className="reservation-title">Identification Reservation</div>
        <p>fill full name or phone number to identify the reservation</p>
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
          <button type="submit">Search</button>
        </div>
      </form>
      {isSearchClicked && (
        <ShowReservationToUpdate
          reservationFound={reservationFound}
          redervationDetailsToUpdate={redervationDetailsToUpdate}
        />
        // <Routes>
        //   <Route
        //     path="/updateReservation/*"
        //     element={
        //       <ShowReservationToUpdate
        //         redervationDetailsToUpdate={redervationDetailsToUpdate}
        //       />
        //     }
        //   />
        // </Routes>
      )}
      {isNotExist && !isSearchClicked && (
        <div>the reservation is not exist</div>
      )}
    </div>
  );
};

export default UpdateReservation;
