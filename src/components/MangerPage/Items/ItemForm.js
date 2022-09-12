import axios from 'axios';
import React, {useState} from 'react';
import './ItemForm.css';

const ItemForm = (props) => {
    const [enteredName , setName] = useState('');
    const [enteredCategory , setCategory] = useState('');
    const [enteredPrice , setPrice] = useState('');
    const [enteredIngredients , setIngredients] = useState([]);
    const [enteredQuantity , setQuantity] = useState('');
    const [enteredDescription, setDescription] = useState('');

    const nameChangeHandler= (event)=>{
        setName(event.target.value); 
    };
    
    const categoryChangeHandler = (event)=>{
        setCategory(event.target.value);
    }

    const priceChangeHandler = (event)=>{
        setPrice(event.target.value);
    };

    const quantityChangeHandler = (event)=> {
        setQuantity(event.target.value);
    }

    const ingredientsChangeHandler = (event)=> {
        setIngredients(event.target.value);
    }

    const descriptionChangeHandler = (event)=> {
        setDescription(event.target.value);
    } 

    const submitHandler = (event)=>{
        event.preventDefault();

        const itemDataBody = {
            new_item_name: enteredName,
            item_category: enteredCategory,
            price: enteredPrice,
            ingredients: enteredIngredients,
            item_quantity: enteredQuantity,
            item_description: enteredDescription
        }
        const url =process.env.REACT_APP_API_PATH + '/item/create';

        const addNewItem = async () =>{ 
            try{
                console.log(itemDataBody);
                const response = await axios.post(url ,itemDataBody);
                if(response.status === 201){
                    console.log(`Item - ${enteredName} - added successfully`);
                }else{
                    console.log('Error');
                }
            }catch(e){
                console.log(e);
            }
        }
        addNewItem();
        setName('');
        setPrice('');
        setDescription('');
        setIngredients('');
        setCategory('');
        setQuantity('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-item_controls'>
                <div className='new-item_control'>
                    <label>Name</label>
                    <input type='text' value={enteredName} onChange={nameChangeHandler}/>
                </div>
                <div className='new-item_control'>
                    <label>Category</label>
                    <select className='select-section' onChange={categoryChangeHandler}>
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
                <div className='new-item_control'>
                    <label>Price</label>
                    <input type='text' value={enteredPrice} min="0.01" step="0.01" onChange={priceChangeHandler}/>
                </div>
                <div className='new-item_control'>
                    <label>Ingredients</label>
                    <input type='text' value={enteredIngredients} onChange={ingredientsChangeHandler}/>
                </div>
                <div className='new-item_control'>
                    <label>Quantity</label>
                    <input type='text' value={enteredQuantity} min="1" onChange={quantityChangeHandler}/>
                </div>
                <div className='new-item_control'>
                    <label>Description</label>
                    <input type='text' value={enteredDescription} onChange={descriptionChangeHandler}/>
                </div>
            </div>
            <div className='new-item_actions'>
                <button type = "button" onClick={props.onCancelClick}>Cancel</button>
                <button type= "submit">Add Item</button>
            </div>
        </form>
    );
}
 
export default ItemForm;