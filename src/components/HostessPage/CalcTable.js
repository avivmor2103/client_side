import React from "react";
import "./Hostess.css";
import ShowTables from "./ShowTables";


const CalcTable = (props) => {

  let tempArr = [];
  function checkSameTime(reservationElem) {
    console.log("hiii from checksum");

    const reservationHour = reservationElem.reservationHour;
    const reservationDate = reservationElem.reservationDate;
    const orderHour = props.order.hourSelected;
    const orderDate = props.order.selectedDate;

    if( orderDate === reservationDate){
      return false
    }

    let array = orderHour.split(":");
    let seconds = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60);
    array = reservationHour.split(":");
    let resultHour = (parseInt(array[0], 10) * 60 * 60) + (parseInt(array[1], 10) * 60);
    
    console.log(reservationHour);
    console.log(orderHour);


    if (seconds-resultHour === 0 || seconds-resultHour < 7200 || seconds-resultHour > (-7200)) {
      return true;
    }
    return false;
  }

  const tablesFit = () => {
    let isSameTableNumber;
    props.reservationsArray.forEach((element) => {
     
      tempArr.forEach((tableEl) => {
        isSameTableNumber = element.numTable.localeCompare(tableEl.num_table);
        if (isSameTableNumber === 0) {
          if (checkSameTime(element)) {
            let index = tempArr.indexOf(tableEl.num_table);
            tempArr.splice(index, 1);
          }
        }
      })
    });
    console.log(tempArr);
    
  };

  const orderDetails = {
    numberOfPeople: props.order.numGuestes,
    Date: props.order.selectedDate,
    hour: props.order.hourSelected,
  };

  const filterTables = ()=>{ 
    props.tablesArray.forEach((table) => {
      const tableNumSeat = parseInt(table.num_seats);
      const orderNumSeat = parseInt(props.order.numGuestes);

      if (parseInt(tableNumSeat) >= parseInt(orderNumSeat)) {
        tempArr.push(table);
      }
    });
    console.log(tempArr);
  }

  filterTables();
  tablesFit();

  return (
    <ShowTables
      filteredTablesArray={tempArr}
      orderDetails={orderDetails}
    />
  );
};

export default CalcTable;
