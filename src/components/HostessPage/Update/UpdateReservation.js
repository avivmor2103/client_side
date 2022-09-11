import React from "react";
import { useState, useEffect } from "react";
import ShowReservationToUpdate from "./ShowReservationToUpdate";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateReservation = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
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
  const [reservationsArray, setReservationsArray] = useState([]);
  const [reservationFound, setReservationFound] = useState({});
  const [tablesArray, setTablesArray] = useState([]);

  useEffect(() => {
    const urlReservations =
      "http://localhost:3001/api/reservations/all_reservations";
    const urlTables = "http://localhost:3001/api/tables/all_table";

    const getAllTables = async () => {
      try {
        const response = await axios.get(urlTables);
        setTablesArray(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    const getAllReservations = async () => {
      try {
        const response = await axios.get(urlReservations);
        setReservationsArray(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllReservations();
    getAllTables();
  }, []);

  const phoneNumberHandler = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };
  const dateHandler = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const hourHandler = (event) => {
    event.preventDefault();
    setHour(event.target.value);
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
  const calcByDate = (reservationElem) => {
    const reservationDate = reservationElem.reservationDate;
    let resultDate = date.localeCompare(reservationDate);
    if (resultDate === 0) return true;
    else return false;
  };
  const calcByhour = (reservationElem) => {
    const reservationHour = reservationElem.reservationHour;
    let resultHour = hour.localeCompare(reservationHour);
    if (resultHour === 0) return true;
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
    if (firstName && lastName && date && hour) {
      for (
        indexReservation = 0;
        indexReservation < reservationsArray.length;
        indexReservation++
      ) {
        if (calcByFirstName(reservationsArray[indexReservation])) {
          if (calcByLastName(reservationsArray[indexReservation])) {
            if (calcByDate(reservationsArray[indexReservation])) {
              if (calcByhour(reservationsArray[indexReservation])) {
                setReservationFound(
                  reservationsArray.find(
                    (e) =>
                      e.firstName === firstName &&
                      e.lastName === lastName &&
                      e.reservationDate === date &&
                      e.reservationHour === hour
                  )
                );
                return true;
              }
            }
          }
        }
      }
    } else {
      if (phoneNumber && date && hour) {
        for (
          indexReservation = 0;
          indexReservation < reservationsArray.length;
          indexReservation++
        ) {
          if (calcByPhoneNumber(reservationsArray[indexReservation])) {
            if (calcByDate(reservationsArray[indexReservation])) {
              if (calcByhour(reservationsArray[indexReservation])) {
                setReservationFound(
                  reservationsArray.find(
                    (e) =>
                      e.phoneNumber === phoneNumber &&
                      e.reservationDate === date &&
                      e.reservationHour === hour
                  )
                );
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    if (cheackIfReservationExist(event)) {
      console.log("this is from submit");
      console.log(reservationFound);
      console.log(reservationsArray);
      setIsSearchClicked(true);
    } else {
      setIsSearchClicked(false);
      setIsNotExist(true);
      console.log("hii from error");
    }
    //else alert("the reservation isn't exist ");
  };

  return (
    <div>
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
        <div className="form-div">
          <label className="form-label">Date</label>
          <input type="text" className="form-input" onChange={dateHandler} />
        </div>
        <div className="form-div">
          <label className="form-label">hour</label>
          <input type="text" className="form-input" onChange={hourHandler} />
        </div>
        <div className="btn-container">
          <button type="submit">Search</button>
        </div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          cancle
        </button>
      </form>
      {isSearchClicked && (
        <ShowReservationToUpdate
          reservationFound={reservationFound}
          reservationsArray={reservationsArray}
          tablesArray={tablesArray}
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
