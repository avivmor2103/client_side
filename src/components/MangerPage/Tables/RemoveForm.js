import axios from 'axios';
import React from 'react';
import './RemoveForm.css';
import TableCard from './TableCard';

const RemoveForm = (props) => {


    const onClickDeleteHandler = (tableNum) =>{ 
        const url = 'http://localhost:3001/api/tables/delete/'+ tableNum; 
    
        const deleteItem = async () =>{ 

            try{
                const response = await axios.delete(url);
                if(response.status === 200)
                {
                    console.log(`Table ${tableNum} deleted successfully`);
                    console.log(response.data);
                    props.updateTablesArray(response.data);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        deleteItem();
    }
   


    return (
        <div className='remove-table-container'>
            <div className='cancel-table_controls'>
                <div className='cancel-table_control'>
                    <label>Delete Table</label>
                </div>
            </div>
            <div className='tables-card-container'>
                { props.tables.map( (table, index)=> { return <TableCard key={index} data={table} onClickDelete={onClickDeleteHandler}/>})
                
                }
            </div>
            <div className='cancel-table_actions'>
                <button onClick={props.onCancelClick}>Cancel</button>
            </div>
        </div>
    );
}
 
export default RemoveForm;