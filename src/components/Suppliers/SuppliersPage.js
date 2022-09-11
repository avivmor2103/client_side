import React, {useState, useEffect} from 'react';
import SupplierCard from './SupplierCard';
import axios from 'axios';
import './SuppliersPage.css';
import AddNewSupplier from './AddNewSupplier';



const SuppliersPage = (props) => {
    const [suppliersList , setSuppliersList] = useState([]);
    const [searchKey , setSearchKey] = useState("");
    const [isAddClicked , setIsAddClicked] = useState(false);

    useEffect(()=>{
        const allSuppliers = async () =>{
            const url = process.env.REACT_APP_API_PATH + '/suppliers/all_suppliers';
            try{
                const response = await axios.get(url);
                setSuppliersList(response.data);
                console.log(response.data);
            }catch(e){
                console.log(e);
            }
        }
        allSuppliers();

    }, []);

    const onChangeHandler = (event)=>{
        setSearchKey(event.target.value);
    }

    const updateSuppliersListHandler= (list) =>{
        setSuppliersList(list);
    }

    const onClickHandler =()=>{
        setIsAddClicked(true);
    }

    const onCancleClickHandler = ()=>{
        setIsAddClicked(false);
    }

    return (
        <div className='page-container'>
            <div className='header-container'>
                Suppliers Page
            </div>
            <div className='container'>
                <div id='filter-input-container'>
                    { !isAddClicked && <input id="input-target" placeholder='Supplier Name' onChange={onChangeHandler}></input>}
                    { !isAddClicked && <button id="btn-add" onClick={onClickHandler}>Add Supplier</button>}
                    { isAddClicked && <AddNewSupplier updateSuppliersList={updateSuppliersListHandler} onCancleClick={onCancleClickHandler}/>}
                </div>
                <hr></hr>
                <div className='suppliers-container'>
                    {suppliersList.map((supplier, index)=>{
                        if(supplier.supplierName.includes(searchKey)){
                            return <SupplierCard supplier={supplier} key={index}/>
                        }else{
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default SuppliersPage;