import axios from 'axios';
import React,{useState} from 'react';
import './RemoveForm.css'

const RemoveForm = (props) => {

    const [enteredTable , setTable] = useState('');


    const tableChangeHandler= (event)=>{
        setTable(event.target.value); 
    };

    const submitHandler = (event)=>{
        event.preventDefault();

        const tableToDeleteBody = {
            id : enteredTable,
        }

        const url = 'http://localhost:3001/api/tables/delete/' + tableToDeleteBody.id; 

        const deleteTable = async () =>{ 

            try{
                const response = await axios.delete(url);
                if(response.status === 200)
                {
                    console.log(`Table ${enteredTable} deleted successfully`);
                }
                else{
                    console.log("Error");
                }

            }catch(e){
                console.log(e);
            }
        }
        deleteTable();
        setTable('');
    };
   


    return (
        <form onSubmit={submitHandler}>
            <div className='cancel-table_controls'>
                <div className='cancel-table_control'>
                    <label>Table Number</label>
                    <input type='text' value={enteredTable} onChange={tableChangeHandler}/>
                </div>
            </div>
            <div className='cancel-table_actions'>
                <button type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button type= "submit">Delete Table</button>
            </div>
    </form>
    );
}
 
export default RemoveForm;