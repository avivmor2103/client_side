import React, {useState, useRef} from 'react';
import './SupplierCard.css';
import emailjs from "@emailjs/browser";

const SupplierCard = (props) => {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const sup = useRef();

	const onChangeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const onSendClick = (event) =>{
        event.preventDefault();
        console.log(sup.current);
        emailjs.send(
        "service_y6083tj",
        "template_wvf9oqa",
        {
            name: props.supplier.supplierName,
            email: props.supplier.supplierEmail,
            file: selectedFile
        },
        "5kAQEhWNY3WJKV0UE"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log(props.supplier.supplierEmail)
        },
        (error) => {
          console.log(error.text);
          console.log(props.supplier.supplierEmail)
        }
      );
        console.log("Send a file with the relavent order");
    }

    return (
        <form ref={sup} className='supplier-card-container' onSubmit={onSendClick}>
            <div className='title-container'>
                <label name="name" value={props.supplier.supplierName}> {props.supplier.supplierName}</label>
            </div>
            <div className='supplier-detailes-container'>
                <label name="email" value={props.supplier.supplierEmail}>Email: {props.supplier.supplierEmail}</label>
                <label name="phone" value={props.supplier.phoneNumber}>Phone: {props.supplier.phoneNumber}</label>
                <label name="address" value={props.supplier.address} >Address: {props.supplier.address}</label>
                <label>Category: {props.supplier.supplierCategory}</label>
            </div>
            <div className='btn-container'>
                <input className='inpt' type="file" name="selectedFile" onChange={onChangeHandler}/>
                <button type='submit' id='btn'>Send</button>
            </div>
        </form>
    );
}
 
export default SupplierCard;