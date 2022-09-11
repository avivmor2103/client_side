import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
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
  const [ReservationsArray, setReservationsArray] = useState([]);
  const [MessageDelete, setMessageDelete] = useState("");

  useEffect(() => {
    const urlReservations =
      "http://localhost:3001/api/reservations/all_reservations";

    const getAllReservations = async () => {
      try {
        const response = await axios.get(urlReservations);
        setReservationsArray(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllReservations();
  }, []);

  const navigate = useNavigate();

  const buildMessage = (msg) => {
    setMessageDelete(msg);
  };

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

  const dateHandler = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const hourHandler = (event) => {
    event.preventDefault();
    setHour(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const redervationDetailsToDelete = {
      firstName: firstName,
      lastName: lastName,
      Date: Date,
      hour: hour,
      phoneNumber: phoneNumber,
    };

    setRedervationDetailsToDelete(redervationDetailsToDelete);
    setIsSearchClicked(true);
  };

  return (
    <div>
      <div>
        <form className="form-reservation" onSubmit={SubmitHandler}>
          <div className="reservation-title">Delete Reservation</div>
          <p>
            to identify fill full name or phone number - the others are
            mandatory
          </p>
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
            <button type="submit">delete</button>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              back
            </button>
          </div>
        </form>
      </div>
      {isSearchClicked && (
        <ShowReservationToDelete
          redervationDetailsToDelete={redervationDetailsToDelete}
          ReservationsArray={ReservationsArray}
          buildMessage={buildMessage}
        />
      )}
      {MessageDelete}
    </div>
  );
};

export default DeleteReservation;
