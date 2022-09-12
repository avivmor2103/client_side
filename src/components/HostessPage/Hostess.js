import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [tablesArray, setTablesArray] = useState([]);
  const [reservationsArray, setReservationsArray] = useState([]);

  useEffect( ()=>{
    const urlTables = process.env.REACT_APP_API_PATH + '/tables/all_table';
    const urlReservations = process.env.REACT_APP_API_PATH + '/reservations/all_reservations';

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
                placeholder="Date"
              />
            </div>
            <div>
              <input className="form-select-hour" type="time" min="12:00" max="23:00" required onChange={hourHandler} placeholder="Time"/>
            </div>
          </div>
          <div className="actions-container">
            <button className="form-btn-action" type="submit">Search</button>
            <button type="button" className="form-btn-action" onClick={onClickHandler}>Cancle</button>
          </div>
        </form>
        {isSearch && <CalcTable order={orderDetailes} tablesArray={tablesArray} reservationsArray={reservationsArray}/>}
      </div>
    </div>
  );
};

export default Hostess;
