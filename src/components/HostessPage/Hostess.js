import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hostess.css";
import CalcTable from "./CalcTable";

const seatsArray = [1,2, 3, 4, 5, 6, 7];

const Hostess = () => {
  const navigate = useNavigate();
  const [seatSelected, setSeatSelected] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [hourSelected, setHourSelected] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [orderDetailes, setOrderDetailes] = useState({});

  const seatsHandler = (event) => {
    event.preventDefault();
    if (event.target.value === "Guests") {
      return;
    }
    setSeatSelected(event.target.value);
  };

  const hourHandler = (event) => {
    event.preventDefault();
    setHourSelected(event.target.value);
  };

  const dateChangeHandler = (event) => {
    event.preventDefault();
    setDateSelected(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const orderDataItem = {
      numGuestes: seatSelected,
      selectedDate: dateSelected,
      hourSelected: hourSelected,
    };
    setOrderDetailes(orderDataItem);
    console.log(orderDataItem);
    setIsSearch(true);
  };

  const onClickHandler  = () => {
    navigate(-1);
  }

  return (
    <div>
      <div className="top-container">
        <div className="host-title">Create New Reservation:</div>
        <form onSubmit={onSubmitHandler} className="form-container">
          <div className="data-input-conatainer">
            <div className="select-seats-container">
              <select onChange={seatsHandler} className="form-select-guests">
                <option>Guests</option>
                {seatsArray.map((seat, index) => {
                  return (
                    <option key={index} value={seat}>{seat}</option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                className="form-input-date"
                type="date"
                value={dateSelected}
                min="2022-01-01"
                max="2023-01-01"
                onChange={dateChangeHandler}
              />
            </div>
            <div>
              <input className="form-select-hour" type="time" min="12:00" max="23:00" required onChange={hourHandler}/>
              {/* <select className="form-select-hour" onChange={hourHandler}>
                <option>Select Hour</option>
                {hourArray.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <div className="actions-container">
            <button className="form-btn-action" type="submit">Search</button>
            <button type="button" className="form-btn-action" onClick={onClickHandler}>Cancle</button>
          </div>
        </form>
        {isSearch && <CalcTable order={orderDetailes} />}
      </div>
    </div>
  );
};

export default Hostess;
