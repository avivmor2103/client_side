import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";

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

const ShowReservationToUpdate = (props) => {
  // const navigate = useNavigate();

  const Currentreservation = props.reservationFound;

  const [firstName, setFirstName] = useState(
    props.redervationDetailsToUpdate.firstName
  );
  const [lastName, setLastName] = useState(
    props.redervationDetailsToUpdate.lastName
  );
  const [phoneNumber, setPhoneNumber] = useState(
    props.redervationDetailsToUpdate.phoneNumber
  );
  const [email, setEmail] = useState(props.reservationFound.clientEmail);
  const [Date, setDate] = useState(props.reservationFound.reservationDate);
  const [numGuests, setNumGuests] = useState(props.reservationFound.numGuests);
  const [hour, setHour] = useState(props.reservationFound.reservationHour);
  const [showMessage, isShowMessage] = useState(false);
  let message = "";

  const numGuestsHandler = (event) => {
    event.preventDefault();
    setNumGuests(event.target.value);
  };

  const hourHandler = (event) => {
    event.preventDefault();
    setHour(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };

  const dateHandler = (event) => {
    event.preventDefault();
    setDate(event.target.value);
  };

  const firstNameHandler = (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const checkIfvalid = (changedElem) => {
    //      let indexReservations = 0 ;
    //      let checkDate ;
    //      let checkHour ;
    //    for(indexReservations =0 ; indexReservations < reservations.length ; indexReservations++)
    //    {
    //        checkDate = Currentreservation.reservationDate.localeCompare(
    //          reservations[indexReservations].reservationDate
    //        );
    //    }
  };

  const updateReservationToDB = (DetailToUpdate) => {
    let canUpdateReservation = true;
    let resNumGuest = DetailToUpdate.numGuests.localeCompare(
      Currentreservation.numGuests
    );
    let resDate = DetailToUpdate.reservationDate.localeCompare(
      Currentreservation.numGuests
    );
    let resHour = DetailToUpdate.reservationHour.localeCompare(
      Currentreservation.numGuests
    );
    let resFirstName = DetailToUpdate.firstName.localeCompare(
      Currentreservation.numGuests
    );
    let resLastName = DetailToUpdate.lastName.localeCompare(
      Currentreservation.numGuests
    );
    let resPhoneNumber = DetailToUpdate.phoneNumber.localeCompare(
      Currentreservation.numGuests
    );
    let resEmail = DetailToUpdate.clientEmail.localeCompare(
      Currentreservation.numGuests
    );

    if (resNumGuest !== 0) {
      if (!checkIfvalid(DetailToUpdate.numGuests)) canUpdateReservation = false;
    }
    if (resDate !== 0) {
      if (!checkIfvalid(DetailToUpdate.reservationDate))
        canUpdateReservation = false;
    }
    if (resHour !== 0) {
      if (!checkIfvalid(DetailToUpdate.reservationHour))
        canUpdateReservation = false;
    }
    if (resFirstName !== 0) {
      //just update without logic

      Currentreservation.firstName = DetailToUpdate.firstName;
      if (!checkIfvalid(DetailToUpdate.firstName)) canUpdateReservation = false;
    }
    if (resLastName !== 0) {
      //just update without logic
      if (!checkIfvalid(DetailToUpdate.lastName)) canUpdateReservation = false;
    }
    if (resPhoneNumber !== 0) {
      //just update without logic
      if (!checkIfvalid(DetailToUpdate.phoneNumber))
        canUpdateReservation = false;
    }
    if (resEmail !== 0) {
      //just update without logic
      if (!checkIfvalid(DetailToUpdate.clientEmail))
        canUpdateReservation = false;
    }

    return canUpdateReservation;
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    let reservationChangesDetails = {
      numGuests: numGuests,
      reservationDate: Date,
      reservationHour: hour,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      clientEmail: email,
    };

    if (updateReservationToDB(reservationChangesDetails))
      message = "the reservation updated succesfully";
    else message = "Fail on updated reservation";
    isShowMessage(true);
  };

  //   const calcByPhoneNumber = (reservationElem) => {
  //     const reservationPhoneNumber = reservationElem.phoneNumber;
  //     let resultPhoneNumber = phoneNumber.localeCompare(reservationPhoneNumber);
  //     if (resultPhoneNumber === 0) return true;
  //     else return false;
  //   };

  //   const calcByFirstName = (reservationElem) => {
  //     const reservationFirstName = reservationElem.firstName;
  //     let resultFirstName = firstName.localeCompare(reservationFirstName);
  //     if (resultFirstName === 0) return true;
  //     else return false;
  //   };

  //   const calcByLastName = (reservationElem) => {
  //     const reservationLastName = reservationElem.lastName;
  //     let resultLastName = lastName.localeCompare(reservationLastName);
  //     if (resultLastName === 0) return true;
  //     else return false;
  //   };

  //   const isReservationExist = (event) => {
  //     if (firstName && lastName) {
  //       reservations.forEach((elem) => {
  //         if (calcByFirstName(elem)) {
  //           if (calcByLastName(elem)) {
  //             alert("the reservation has been recognized! ");
  //           } else alert("the reservation is not exist! ");
  //         }
  //       });
  //     } else {
  //       if (phoneNumber) {
  //         reservations.forEach((elem) => {
  //           if (calcByPhoneNumber(elem)) {
  //             alert("the reservation has been recognized! ");
  //           } else alert("the reservation is not exist! ");
  //         });
  //       }
  //     }
  //   };

  //   isReservationExist();

  return (
    <div>
      {/* <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button> */}
      <form className="form-reservation" onSubmit={SubmitHandler}>
        <div className="reservation-title">Edit Reservation</div>

        <div className="form-div">
          <label className="form-label">No. guestes</label>
          <input
            type="string"
            onChange={numGuestsHandler}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">Date</label>
          <input type="text" className="form-input" onChange={dateHandler} />
        </div>
        <div className="form-div">
          <label className="form-label">Hour</label>
          <input type="text" onChange={hourHandler} className="form-input" />
        </div>
        <div className="form-div">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="form-input"
            onChange={firstNameHandler}
          />
        </div>
        <div className="form-div">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="form-input"
            onChange={lastNameHandler}
          />
        </div>
        <div className="form-div">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            className="form-input"
            onChange={phoneNumberHandler}
          />
        </div>
        <div className="form-div">
          <label className="form-label">Email</label>
          <input type="text" className="form-input" onChange={emailHandler} />
        </div>
        <div className="btn-container">
          <button type="submit">update</button>
        </div>
      </form>
      {showMessage && <p>{message}</p>}
    </div>
  );
};

export default ShowReservationToUpdate;
