import React, { useState } from "react";
import Reservations from "./Reservations";

import "./ShowTables.css";

const ShowTables = (props) => {
  console.log(props.filteredTablesArray);
  const [selectedTable, setSelectedTable] = useState("");
  const [isTableSelected, setIsTableSelected] = useState(false);

  const showOrderReservation = (event) => {
    let tableClicked = event.target.value;
    setSelectedTable(tableClicked);
    setIsTableSelected(true);
    // const element = document.getElementById("show");
    // element.scrollIntoView();
  };

  return (
    <div className="show-tables-container">
      <div className="item">
        <div className="title">Choose Table:</div>
        <div className="buttons-table-container">
          {props.filteredTablesArray.map((item, index) => {
            return (
              <button
                value={item.num_table}
                type="button"
                key={index}
                onClick={showOrderReservation}
                className="button-table"
              >
                {item.num_table} {item.area}
              </button>
            );
          })}
        </div>
      </div>
      <div className="item">
        {isTableSelected && (
          <Reservations
            tableClicked={setIsTableSelected}
            className="top-container"
            numTable={selectedTable}
            numberOfPeople={props.orderDetails.numberOfPeople}
            Date={props.orderDetails.Date}
            hour={props.orderDetails.hour}
          />
        )}
      </div>
    </div>
  );
};

export default ShowTables;
