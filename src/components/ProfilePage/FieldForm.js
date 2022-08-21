import axios from 'axios';
import React, {useState} from 'react';
import './FieldForm.css';

const FieldForm = (props) => {
    const [enteredField , setField] = useState('');


    const itemIdChangeHandler= (event)=>{
        setField(event.target.value); 
    };

    const submitHandler = (event)=>{
        event.preventDefault();
        const body = {
            id:  enteredField
        }
        const url = 'http://localhost:3001/api/user/update/';

        console.log(url);
        const updateField = async () =>{ 

            try{
                const response = await axios.put(url, body);
                if(response.status === 200)
                {
                    console.log(`Item ${enteredField} deleted successfully`);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        updateField();
        setField('');
    };
   


    return (
        <form onSubmit={submitHandler}>
            <div className='update-field_controls'>
                <div className='update-field_control'>
                    <label>New {props.field}</label>
                    <input type='text' value={enteredField} onChange={itemIdChangeHandler}/>
                </div>
            </div>
            <div className='update-field_actions'>
                <button type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button type= "submit">Update</button>
            </div>
        </form>
    );
}
 
export default FieldForm;