import axios from "axios";
import React, { useState } from "react";
import ItemButton from "./ItemButton";
import './Dishes.css';



const Dishes = (props) => {

    // const [isFoodClicked , setIsFoodClicked] = useState(false);
    // const [isBeveragesClicked , setIsBeveragesClicked] = useState(false);
    const [isClicked , setIsClicked] = useState(0);
    const [catgoryItemsList , setCatgoryItemsList] = useState([]);
    const [tableItems, setTableItems] = useState([props.items]);
    const enable = false;

    const handleTypeItemClick = (event) => {
        //console.log(event.target.value);
        if(event.target.value === 'Food')
        {
            setIsClicked(1);
        }
        else if(event.target.value === 'Drinks'){
            setIsClicked(2);
        }
    };

    const hadleItemCategoryClick = (event) => {
        const categoryType = event.target.value; 
        const url = 'http://localhost:3001/api/item/get_items_by_category/' + categoryType ;
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        const getItemsByCategory = async () =>{
            try{
                const res = await axios.get(url , config);
                //console.log(res.data);
                setCatgoryItemsList(res.data);
            }catch(e){
                console.log(e);
            }
        }   
        getItemsByCategory() ;
    }

    const addItem = (obj)=>{
        // console.log(obj);
        props.onAddItem(obj);
    }


    return (
        <div className='middle-div-container'>
            <div className='dish-container'>
                <div className="middle-left-title">Dishes</div>
                <button className='top-category' value="Food" onClick= {handleTypeItemClick} disabled={enable}>Food</button>
                <button className='top-category' value="Drinks" onClick= {handleTypeItemClick} disabled={enable}>Drinks</button>

                <button className='foodCategoryButtons' value="1" onClick= {hadleItemCategoryClick} disabled={ isClicked === 1? false : true } >STARTERS</button>
                <button className='foodCategoryButtons' value="2" onClick= {hadleItemCategoryClick} disabled={ isClicked === 1? false : true } >INTERMEDIATE</button>
                <button className='foodCategoryButtons' value="3" onClick= {hadleItemCategoryClick} disabled={ isClicked === 1? false : true } >MAIN</button>
                <button className='foodCategoryButtons' value="4" onClick= {hadleItemCategoryClick} disabled={ isClicked === 1? false : true } >DESSERT</button>

                <button className='drinksCategoryButtons' value="5" onClick= {hadleItemCategoryClick} disabled={ isClicked === 2? false: true}>SOFT</button>
                <button className='drinksCategoryButtons' value="6" onClick= {hadleItemCategoryClick} disabled={ isClicked === 2? false : true } >ALCOHOL</button>
                <button className='drinksCategoryButtons' value="7" onClick= {hadleItemCategoryClick} disabled={ isClicked === 2? false : true } >HOT</button>
            </div>
            <div className="items-container"> 
                <div className="middle-left-title">Items List</div>
                <div className="items-container">
                    {catgoryItemsList.map((item, index)=>{
                        return <ItemButton value={item} key={index} onAddItem={addItem} />
                    })}
                </div>
            </div>

        </div>
    )
}

export default Dishes;