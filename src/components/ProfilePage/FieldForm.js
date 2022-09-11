import axios from 'axios';
import React, {useState} from 'react';
import './FieldForm.css';

const FieldForm = (props) => {
    const [enteredField , setField] = useState('');
    const userId = props.user.id;

    const itemIdChangeHandler= (event)=>{
        setField(event.target.value); 
    };

    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(userId);
        let body = findBody(enteredField);
        console.log(body);
        const url = process.env.REACT_APP_API_PATH + '/user/update/';
        const updateField = async () =>{ 

            try{
                const response = await axios.put(url, body);
                console.log(response);
                if(response.status === 200)
                {
                    console.log(`successfully`);
                }
                else{
                    alert(response.data);
                }
            }catch(e){
                console.log(e);
            }
        }
        updateField();
        setField('');
    };

    const findBody =(dataField)=> {
        console.log(props.field.toLowerCase());
        if(props.field.toLowerCase() === "id"){
            const body = {
                personal_id : userId,
                new_id: dataField
            }
            return body ;
        }

        if(props.field.toLowerCase() === "first name"){
            const body = {
                personal_id : userId,
                first_name : dataField
            }
            return body ;
        }

        if(props.field.toLowerCase() === "last name"){
            const body = {
                personal_id : userId,
                last_name : dataField
            }
            return body ;
        }

        if(props.field.toLowerCase() === "phone number"){
            console.log("here");
            const body = {
                personal_id : userId,
                phone_number : dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "address"){
            const body = {
                personal_id : userId,
                address : dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "email"){
            const body = {
                personal_id : userId,
                email :  dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "position"){
            const body = {
                personal_id : userId,
                position : dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "status"){
            const body = {
                personal_id : userId,
                status : dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "date of birth"){
            const body = {
                personal_id : userId,
                date_of_birth : dataField
            }
            return body ;
        }
        if(props.field.toLowerCase() === "password"){
            const body = {
                personal_id : userId,
                password : dataField
            }
            return body ;
        }
    }


    return (
        <form onSubmit={submitHandler}>
            <div className='prev-data-container'>
                Current {props.field}:  {props.data}
            </div>
            <div className='update-field_controls'>
                <div className='update-field_control'>
                    <label>New {props.field}</label>
                    <input type='text' value={enteredField} onChange={itemIdChangeHandler}/>
                </div>
            </div>
            <div className='update-field_actions'>
                <button id="btn-cancle" type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button id="btn-update" type= "submit">Update</button>
            </div>
        </form>
    );
}
 
export default FieldForm;