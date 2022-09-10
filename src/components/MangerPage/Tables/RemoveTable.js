import axios from 'axios';
import React, {useState} from 'react';
import RemoveForm from './RemoveForm';
import './RemoveTable.css';
const RemoveTable = (props) => {
    const [isEditing , setIsEditting] = useState(false);
    const [tablesArray , setTableArray] = useState([]);

    const startEditingClickHandler = ()=> {
        setIsEditting(true);
        const url = process.env.REACT_APP_API_PATH + '/tables/all_table';
        const getAllTables = async ()=> {
            try{
                const response = await axios.get(url);
                if(response.status === 200){
                    console.log(response);
                    console.log(response.data);
                    setTableArray(response.data);
                }else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        getAllTables();
    }



    const onCancelClickHandler =()=>{
        setIsEditting(false);
    }

    const updateTablesArrayHandler =(newTables)=> {
        setTableArray(newTables);
    }

    return (
        <div className="delete-table-container">
            {!isEditing && <button className='btn' onClick={startEditingClickHandler}>Delete Table</button>}
            {isEditing && <RemoveForm onCancelClick={onCancelClickHandler} tables={tablesArray} updateTablesArray={updateTablesArrayHandler}/>} 
        </div>
    )
} 
export default RemoveTable;