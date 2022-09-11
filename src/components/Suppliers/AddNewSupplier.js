import axios from 'axios';
import React, { useState } from 'react';
import './AddNewSupplier.css';


const AddNewSupplier = (props) => {
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setSddress] = useState('');
    const [supplierCategory, setSupplierCategory] = useState('');

    const onChangeName = (event)=>{
        setSupplierName(event.target.value);
    }

    const onChangeEmail = (event)=>{
        setSupplierEmail(event.target.value);
    }

    const onChangePhone = (event)=>{
        setPhoneNumber(event.target.value);
    }

    const onChangeAddress = (event)=>{
        setSddress(event.target.value);
    }

    const onChangeCategory = (event)=>{
        setSupplierCategory(event.target.value);
    }

    const onSubmitHandler = () => {
        const body ={ 
            name: supplierName,
            email: supplierEmail,
            phone: phoneNumber,
            address: address,
            category: supplierCategory
        }
        const url = process.env.REACT_APP_API_PATH + '/suppliers/create';

        const addNewSupplier = async ()=>{
            try{
                const response = await axios.post(url, body);
                props.updateSuppliersList(response.data);
                props.onCancleClick();
            }catch(e){
                console.log(e);
            }
        }
        addNewSupplier();
    }

    const onClickHandler = () =>{
        props.onCancleClick();
    }


    return (
        <div className='add-new-container'>
            <form onSubmit={onSubmitHandler} className="form-conatainer">
                <input className='input-form' placeholder='Supplier Name' onChange={onChangeName}/>
                <input className='input-form' placeholder='Supplier Email' onChange={onChangeEmail}/>
                <input className='input-form' placeholder='Phone Number' onChange={onChangePhone}/>
                <input className='input-form' placeholder='Address' onChange={onChangeAddress}/>
                <input className='input-form' placeholder='Supplier Category' onChange={onChangeCategory}/>
                <div className='btn-container'>
                    <button className="btn" type='submit'>Add</button>
                    <button className="btn" type='button' onClick={onClickHandler}>Cancle</button>
                </div>
            </form>
            </div>
    );
}
 
export default AddNewSupplier;