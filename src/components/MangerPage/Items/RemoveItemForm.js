import axios from 'axios';
import React, {useState} from 'react';
import './RemoveItemForm.css';
import ItemCard from './ItemCard'; 

const RemoveItemFrom = (props) => {
    const [enteredItemId , setItemId] = useState('');
    const [itemsArray, setItemsArray] = useState([]);

    const onDeleteClickHandler = (itemId)=>{

        const url = process.env.REACT_APP_API_PATH + '/item/delete/'+ itemId; 
        //console.log(url);
        const deleteItem = async () =>{ 

            try{
                const response = await axios.delete(url);
                if(response.status === 200)
                {
                    console.log(`Item ${enteredItemId} deleted successfully`);
                }
                else{
                    console.log("Error");
                }
            }catch(e){
                console.log(e);
            }
        }
        deleteItem();
        setItemId('');
    };


    const onChooseItemCategory = (event) => {
        const categoryType = event.target.value; 
        const url = process.env.REACT_APP_API_PATH + '/item/get_items_by_category/' + categoryType ;
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        const getItemsByCategory = async () =>{
            try{
                const res = await axios.get(url , config);
                console.log(res.data);
                setItemsArray(res.data);
            }catch(e){
                console.log(e);
            }
        }   
        getItemsByCategory();
    }

    return (
        <div className='top-div-container'>
            <div className='select-item-category-container'>
                <h5 className="section-title" >Select Item Category</h5>
                <select className='select-section' onChange={onChooseItemCategory}>
                    <option className='selection-option' value="0">Select</option>
                    <option className='selection-option' value="1">Starters</option>
                    <option className='selection-option' value="2">Appetizers</option>
                    <option className='selection-option' value="3">Main</option>
                    <option className='selection-option' value="4">Desserts</option>
                    <option className='selection-option' value="5">Soft beverages</option>
                    <option className='selection-option' value="6">Alcohole beverages</option>
                    <option className='selection-option' value="7">Hot beverages</option>
                </select>
            </div>
            <div className="items-cards-container">
                {itemsArray.map((itemElement, index) => {
                                        return <ItemCard item={itemElement} key={index} onDeleteClick={onDeleteClickHandler} />
                                    })}
            </div>     
            <div className='cancel-item_actions'>
                <button type="button" onClick={props.onCancelClick}>Cancel</button>
            </div>

        </div>
    );
}
 
export default RemoveItemFrom;



 // <form onSubmit={submitHandler}>
 //   <div className='cancel-item_controls'>
 //     <div className='cancel-item_control'>
 //         <label>Item Id</label>
 //         <input type='text' value={enteredItemId} onChange={itemIdChangeHandler}/>
 //      </div>
 //    </div>
 //    <div className='cancel-item_actions'>
 //     <button type = "button" onClick={props.onCancelClick}>Cancel</button>
 //     <button type= "submit">Delete Item</button>
 //     </div>
 //  </form> 