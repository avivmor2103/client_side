import React, {useState} from 'react';
import axios from "axios";
import './TableForm.css';


const TableForm = (props) => {
    const [enteredTable , setTable] = useState('');
    const [enteredSeats , setSeats] = useState('');
    const [enteredErea , setErea] = useState('');

    const TableChangeHandler= (event)=>{
        setTable(event.target.value); 
    };
    
    const seatsChangeHandler = (event)=>{
        setSeats(event.target.value);
    }

    const onChooseEreaClick = (event)=>{
        setErea(event.target.value);
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        const tableDataBody = {
            num_table : enteredTable,
            num_seats : enteredSeats,
            erea :  enteredErea
        };

        const url = 'http://localhost:3001/api/tables/create/';

        const addNewTable = async () => {
            try{
                const response = await axios.post(url, tableDataBody);
                if(response.status === 200)
                {
                    console.log('Add new Table successfully');
                }
            }
            catch(e){
                console.log(e);
            }
        }

        addNewTable();        
        setTable('');
        setSeats('');
        setErea('');
    };
   

    return (
        <form onSubmit={submitHandler}>
            <div className='new-table_controls'>
                <div className='title-conatainer'>
                    Add New Table
                </div>
                <div className='new-table_controls'>
                    <div className='new-table_control'>
                        <label>Table Number</label>
                        <input type='text' value={enteredTable} onChange={TableChangeHandler}/>
                    </div>
                    <div className='new-table_control'>
                        <label>Seats Number</label>
                        <input type='text' value={enteredSeats} min="1" max="10" onChange={seatsChangeHandler}/>
                    </div> 
                    <div className='new-table_control'>
                        <label>Erea</label>
                        <select onClick={onChooseEreaClick} className='new-table-select'>
                            <option className='new-table-option' value='0'>Select</option>
                            <option className='new-table-option' value='1'>Indise</option>
                            <option className='new-table-option' value='2'>Bar</option>
                            <option className='new-table-option' value='3'>Balcony</option>
                            <option className='new-table-option' value='4'>Yard</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='new-table_actions'>
                <button type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button type= "submit">Add</button>
            </div>
        </form>
    );
}
 
export default TableForm;