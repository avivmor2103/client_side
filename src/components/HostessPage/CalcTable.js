import React, { useState, useEffect } from "react";
import "./Hostess.css";
import ShowTables from "./ShowTables";
import axios from 'axios';
//import moment from "moment";

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

const Tables = [
  {
    num_table: "table10",
    tableId: Math.random().toString(),
    numberSeat: "6",
    area: " out",
  },
  {
    num_table: "table11",
    tableId: Math.random().toString(),
    numberSeat: "5",
    area: " out",
  },
  {
    num_table: "table12",
    tableId: Math.random().toString(),
    numberSeat: "3",
    area: " in",
  },
  {
    num_table: "table13",
    tableId: Math.random().toString(),
    numberSeat: "2",
    area: " balcony",
  },
  {
    num_table: "table14",
    tableId: Math.random().toString(),
    numberSeat: "4",
    area: " balcony",
  },
];

const CalcTable = (props) => {

  const [tablesArray, setTablesArray] = useState([]);
  const [reservationsArray, setReservationsArray] = useState([]);
  const [filteredTablesArray, setFilteredTablesArray] = useState([]);

  useEffect( ()=>{
    const urlTables = 'http://localhost:3001/api/tables/all_table';
    const urlReservations = 'http://localhost:3001/api/tables/all_table';

    const getAllTables = async() =>{
      try{
        const response = await axios.get(urlTables);
        setTablesArray(response.data);
      }catch(e){
        console.log(e);
      }
    }

    const getAllReservations = async() =>{
      try{
        const response = await axios.get(urlReservations);
        setReservationsArray(response.data);
      }catch(e){
        console.log(e);
      }
    }
    getAllTables();
    getAllReservations();
  }, []);

  //const tableWhichSeatNumIsFitting = [];


  // function checkSameTime(reservationElem) {
  //   console.log("hiii from checksum");

  //   const reservationHour = reservationElem.hour;
  //   const reservationDate = reservationElem.Date;
  //   const orderHour = props.order.hourSelected;
  //   const orderDate = props.order.selectedDate;
  //   let resultHour = orderHour.localeCompare(reservationHour);
  //   console.log(reservationHour);
  //   console.log(orderHour);

  //   // let time1 = moment(reservationHour, "hh:mm");
  //   // let time2 = moment("1:00", "hh:mm");
  //   // let subtract = time1.subtract(time2);
  //   // const tempHour = moment().subtract(1, reservationHour);
  //   //let format = moment(subtract).format("hh:mm");

  //   const date = new Date("2021-06-30T" + reservationHour + ":00.000Z");

  //   date.setHours(date.getHours() - 2); // subtracted 2 hours from existing date

  //   console.log("this is subtract tempHour");
  //   //update the hour , need to extractdate.setHours(date.getHours() - 2);
  //   console.log(date.toISOString());

  //   if (resultHour === 0) {
  //     //create a function that takes the hour +2 / -2
  //     let result = orderDate.localeCompare(reservationDate);

  //     if (result === 0) return true;
  //     else return false;
  //   }
  //   return false;
  // }

  // const tablesFit = () => {
  //   tablesArray.forEach((table) => {
  //     const tableNumSeat = parseInt(table.num_seats, 10);
  //     const orderNunSeat = parseInt(props.order.numGuestes, 10);
  //     if (tableNumSeat >= orderNunSeat) {
  //       tableWhichSeatNumIsFitting.push(table);
  //     }
  //   });
  //   let isSameTableNumber;
  //   reservations.forEach((element) => {
  //     tableWhichSeatNumIsFitting.forEach((tableEl) => {
  //       isSameTableNumber = element.tableNum.localeCompare(tableEl.num_table);
  //       if (isSameTableNumber === 0) {
  //         if (checkSameTime(element)) {
  //           let index = tableWhichSeatNumIsFitting.indexOf(tableEl.num_table);
  //           tableWhichSeatNumIsFitting.splice(index, 1);
  //         }
  //       }
  //     });
  //   });
  // };

  const orderDetails = {
    numberOfPeople: props.order.numGuestes,
    Date: props.order.selectedDate,
    hour: props.order.hourSelected,
  };

  //tablesFit();


  const filterTables = ()=>{ 
    tablesArray.forEach((table) => {
      const tableNumSeat = parseInt(table.num_seats);
      const orderNunSeat = parseInt(props.order.numGuestes);
      if (tableNumSeat >= orderNunSeat) {
        setFilteredTablesArray((prevArray)=>{
          return [table, ...prevArray];
        });
      }
    });
  }

  filterTables();

  return (
    <ShowTables
      filteredTablesArray={filteredTablesArray}
      orderDetails={orderDetails}
    />
  );
};

export default CalcTable;
