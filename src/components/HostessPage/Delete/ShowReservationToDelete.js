import { EmailJSResponseStatus } from "@emailjs/browser";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowReservationToDelete = (props) => {
  const hour = props.redervationDetailsToDelete.hour;
  const date = props.redervationDetailsToDelete.Date;
  const firstName = props.redervationDetailsToDelete.firstName;
  const lastName = props.redervationDetailsToDelete.lastName;
  const phoneNumber = props.redervationDetailsToDelete.phoneNumber;
  let MessageDelete = "";

  const ReservationsArray = props.ReservationsArray;

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

  const deleteReservation = async (reservationId) => {
    const urlDelete =
      "http://localhost:3001/api/reservations/delete/" + reservationId;
    try {
      const response = await axios.delete(urlDelete);
      props.buildMessage("reservation deleted successfully");
    } catch (e) {
      console.log(e);
      props.buildMessage("failed to delete this reservations");
    }
  };

  const calcReservation = async () => {
    let lengthReservationOriginal = ReservationsArray.length;
    let indexToDelete;
    if (firstName && lastName && date && hour) {
      for (
        indexToDelete = 0;
        indexToDelete < ReservationsArray.length;
        indexToDelete++
      ) {
        if (calcByFirstName(ReservationsArray[indexToDelete])) {
          if (calcByLastName(ReservationsArray[indexToDelete])) {
            if (calcByDate(ReservationsArray[indexToDelete])) {
              if (calcByhour(ReservationsArray[indexToDelete])) {
                let obj = ReservationsArray.find(
                  (e) =>
                    e.firstName === firstName &&
                    e.lastName === lastName &&
                    e.reservationDate === date &&
                    e.reservationHour === hour
                );
                deleteReservation(obj.reservationId);
              }
            }
          }
        }
      }
    } else {
      if (phoneNumber && date && hour) {
        for (
          indexToDelete = 0;
          indexToDelete < ReservationsArray.length;
          indexToDelete++
        ) {
          if (calcByPhoneNumber(ReservationsArray[indexToDelete])) {
            if (calcByDate(ReservationsArray[indexToDelete])) {
              if (calcByhour(ReservationsArray[indexToDelete])) {
                let obj = ReservationsArray.find(
                  (e) =>
                    e.phoneNumber === phoneNumber &&
                    e.reservationDate === date &&
                    e.reservationHour === hour
                );
                deleteReservation(obj.reservationId);
              }
            }
          }
        }
      }
    }
  };

  calcReservation();

  return <div>{MessageDelete}</div>;
};

export default ShowReservationToDelete;
