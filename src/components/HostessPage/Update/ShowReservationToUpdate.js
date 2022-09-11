import React, { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const ShowReservationToUpdate = (props) => {
  // const navigate = useNavigate();

  const Currentreservation = props.reservationFound;
  const ReservationArray = props.reservationsArray;
  const TablesArray = props.tablesArray;

  const [firstName, setFirstName] = useState(Currentreservation.firstName);
  const [lastName, setLastName] = useState(Currentreservation.lastName);
  const [phoneNumber, setPhoneNumber] = useState(
    Currentreservation.phoneNumber
  );
  const [email, setEmail] = useState(Currentreservation.clientEmail);
  const [date, setDate] = useState(Currentreservation.reservationDate);
  const [numGuests, setNumGuests] = useState(Currentreservation.numGuests);
  const [hour, setHour] = useState(Currentreservation.reservationHour);
  const [showMessage, isShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const updateReservation = async (Currentreservation) => {
    const url = "http://localhost:3001/api/reservations/update";
    try {
      const response = await axios.put(url, Currentreservation);
    } catch (e) {
      console.log(e);
    }
  };

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

  const checkIfNumGuestIsvalid = (changedElem) => {
    //if its num guests
    let indexReservation = 0;
    let tableElement = TablesArray.find(
      (table) => table.num_table === Currentreservation.numTable
    );
    if (tableElement) {
      console.log(tableElement);
      let numSeat_table = parseInt(tableElement.num_seats);
      let numSeat_selected = parseInt(changedElem);
      if (numSeat_table >= numSeat_selected) {
        Currentreservation.numGuests = changedElem;
        return true;
      }
    } else {
      let existTableArray = [];

      TablesArray.forEach((tableEl) => {
        let numSeat_table = parseInt(tableEl.num_seats);
        let numSeat_selected = parseInt(changedElem);
        if (numSeat_table >= numSeat_selected) {
          existTableArray.push(tableEl);
        }
      });
      if (existTableArray.length !== 0) {
        let indexTableArray = 0;
        for (
          indexTableArray = 0;
          indexTableArray < existTableArray.length;
          indexTableArray++
        ) {
          for (
            indexReservation = 0;
            indexReservation < ReservationArray.length;
            indexReservation++
          ) {
            let tableElem = existTableArray[indexTableArray];
            if (
              ReservationArray[indexReservation].numTable ===
                tableElem.num_table &&
              ReservationArray[indexReservation].reservationHour === hour &&
              ReservationArray[indexReservation].reservationDate === date
            ) {
              existTableArray.splice(indexTableArray, 1);
            }
          }
          if (indexTableArray === existTableArray.length - 1) {
            //finish the reservation array so the table is not order - finish check!
            let newNumTable = existTableArray[0].num_table;
            Currentreservation.numGuests = changedElem;
            Currentreservation.numTable = newNumTable;
            return true;
          }
        }
      } else {
        let msg = "there is no table for " + changedElem + "seats";
        setMessage(msg);
      }
    }
    return false;
  };

  const checkSameTime = (reservationElem) => {
    const reservationHour = reservationElem.hour;
    const reservationDate = reservationElem.Date;
    const orderHour = hour;
    const orderDate = date;
    let resultHour = orderHour.localeCompare(reservationHour);
    if (resultHour === 0) {
      let result = orderDate.localeCompare(reservationDate);
      if (result === 0) return true;
      else return false;
    }
    return false;
  };

  const checkIfDateHourvalid = (changedElem) => {
    let indexReservation = 0;

    for (
      indexReservation = 0;
      indexReservation < ReservationArray.length;
      indexReservation++
    ) {
      let reservationElem = ReservationArray[indexReservation];
      if (
        reservationElem.numTable == Currentreservation.num_table &&
        reservationElem.reservationDate == changedElem &&
        reservationElem.reservationHour == hour
      )
        break;
      if ((indexReservation = ReservationArray.length - 1)) {
        Currentreservation.reservationDate = changedElem;
        Currentreservation.reservationHour = hour;
        return true;
      }
    }

    TablesArray.forEach((table) => {
      let tableWhichSeatNumIsFitting = [];
      let numSeat_table = parseInt(table.num_seats);
      let numGuests_selected = parseInt(numGuests);
      if (numSeat_table >= numGuests_selected) {
        tableWhichSeatNumIsFitting.push(table);
      }

      let isSameTableNumber;

      tableWhichSeatNumIsFitting.forEach((tableEl) => {
        ReservationArray.forEach((element) => {
          isSameTableNumber = element.numTable.localeCompare(tableEl.num_table);
          if (isSameTableNumber === 0) {
            if (checkSameTime(element)) {
              let index = tableWhichSeatNumIsFitting.indexOf(tableEl.num_table);
              tableWhichSeatNumIsFitting.splice(index, 1);
            }
          }
        });
      });
      if (tableWhichSeatNumIsFitting.length > 0) {
        let newNumTable = tableWhichSeatNumIsFitting[0].num_table;
        Currentreservation.numTable = newNumTable;
        Currentreservation.reservationDate = changedElem;
        Currentreservation.reservationHour = hour;
        return true;
      } else {
        setMessage("There is no available table for these requests");
        return false;
      }
    });
  };

  const updateReservationToDB = (DetailToUpdate) => {
    let enableUpdateReservation = true;
    let resNumGuest = DetailToUpdate.numGuests.localeCompare(
      Currentreservation.numGuests
    );
    let resDate = DetailToUpdate.reservationDate.localeCompare(
      Currentreservation.reservationDate
    );
    let resHour = DetailToUpdate.reservationHour.localeCompare(
      Currentreservation.reservationHour
    );

    let resFirstName = DetailToUpdate.firstName.localeCompare(
      Currentreservation.firstName
    );
    let resLastName = DetailToUpdate.lastName.localeCompare(
      Currentreservation.lastName
    );
    let resPhoneNumber = DetailToUpdate.phoneNumber.localeCompare(
      Currentreservation.phoneNumber
    );
    let resEmail = DetailToUpdate.clientEmail.localeCompare(
      Currentreservation.clientEmail
    );

    if (resNumGuest !== 0) {
      if (!checkIfNumGuestIsvalid(DetailToUpdate.numGuests))
        enableUpdateReservation = false;
    }
    if (resDate !== 0 || resHour !== 0) {
      if (!checkIfDateHourvalid(DetailToUpdate.reservationDate))
        enableUpdateReservation = false;
    }

    if (resFirstName !== 0) {
      Currentreservation.firstName = DetailToUpdate.firstName;
    }
    if (resLastName !== 0) {
      Currentreservation.lastName = DetailToUpdate.lastName;
    }
    if (resPhoneNumber !== 0) {
      Currentreservation.phoneNumber = DetailToUpdate.phoneNumber;
    }
    if (resEmail !== 0) {
      Currentreservation.clientEmail = DetailToUpdate.clientEmail;
    }

    return enableUpdateReservation;
  };

  const SubmitHandler = (event) => {
    console.log("hello from submit show");
    event.preventDefault();
    let reservationChangesDetails = {
      numGuests: numGuests,
      reservationDate: date,
      reservationHour: hour,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      clientEmail: email,
    };

    if (updateReservationToDB(reservationChangesDetails)) {
      updateReservation(Currentreservation);
      setMessage("the reservation updated succesfully");
      console.log(Currentreservation);
    }

    isShowMessage(true);
  };

  return (
    <div>
      <form className="form-reservation" onSubmit={SubmitHandler}>
        <div className="reservation-title">Edit Reservation</div>

        <div className="form-div">
          <label className="form-label">No. guestes</label>
          <input
            type="string"
            value={numGuests}
            onChange={numGuestsHandler}
            className="form-input"
          />
        </div>
        <div className="form-div">
          <label className="form-label">Date</label>
          <input
            type="text"
            value={date}
            className="form-input"
            onChange={dateHandler}
          />
        </div>
        <div className="form-div">
          <label className="form-label">Hour</label>
          <input
            type="text"
            value={hour}
            onChange={hourHandler}
            className="form-input"
          />
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
          <input
            type="text"
            value={email}
            className="form-input"
            onChange={emailHandler}
          />
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
