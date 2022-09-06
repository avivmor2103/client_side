import React, { useState } from "react";

const reservations = [
  {
    id: Math.random().toString(),
    tableNum: "table10",
    numberOfPeople: "6",
    Date: "2022-09-10",
    hour: "18:00",
    firstName: "talia",
    lastName: "rint",
    phoneNumber: "0544252287",
  },
  {
    id: Math.random().toString(),
    tableNum: "table12",
    numberOfPeople: "3",
    Date: "2022-09-09",
    hour: "18:00",
    firstName: "ofek",
    lastName: "cohen",
    phoneNumber: "0546891120",
  },
];

const ShowReservationToDelete = (props) => {
  const firstName = props.redervationDetailsToDelete.firstName;
  const lastName = props.redervationDetailsToDelete.lastName;
  const phoneNumber = props.redervationDetailsToDelete.phoneNumber;
  let MessageDelete = "Reservation deleted successfully!";

  const calcByPhoneNumber = (reservationElem) => {
    const reservationPhoneNumber = reservationElem.phoneNumber;
    let resultPhoneNumber = phoneNumber.localeCompare(reservationPhoneNumber);
    if (resultPhoneNumber === 0) return true;
    else return false;
  };

  const calcByFirstName = (reservationElem) => {
    const reservationFirstName = reservationElem.firstName;
    let resultFirstName = firstName.localeCompare(reservationFirstName);
    console.log("this is first name fron reservation " + reservationFirstName);
    console.log("this is first name fron delete form " + firstName);

    if (resultFirstName === 0) return true;
    else return false;
  };

  const calcByLastName = (reservationElem) => {
    const reservationLastName = reservationElem.lastName;
    let resultLastName = lastName.localeCompare(reservationLastName);
    console.log("this is first name fron reservation " + reservationLastName);
    console.log("this is first name fron delete form " + firstName);

    if (resultLastName === 0) return true;
    else return false;
  };

  const calcReservation = () => {
    let indexToDelete;
    if (firstName && lastName) {
      reservations.forEach((elem) => {
        if (calcByFirstName(elem)) {
          if (calcByLastName(elem)) {
            indexToDelete = reservations.indexOf({
              firstName: firstName,
              lastName: lastName,
            });
            reservations.splice(indexToDelete, 1);
          }
        }
      });
    } else {
      if (phoneNumber) {
        reservations.forEach((elem) => {
          if (calcByPhoneNumber(elem)) {
            indexToDelete = reservations.indexOf({
              phoneNumber: phoneNumber,
            });
            reservations.splice(indexToDelete, 1);
          }
        });
      }
    }

    console.log("this is the array");
    console.log(reservations);
  };

  calcReservation();

  //if isnt delete change the string !
  return <div>{MessageDelete}</div>;
};

export default ShowReservationToDelete;
