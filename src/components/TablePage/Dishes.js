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
        const url = process.env.REACT_APP_API_PATH + '/item/get_items_by_category/' + categoryType ;
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
                <button className='foodCategoryButtons' value="1" onClick= {hadleItemCategoryClick} >STARTERS</button>
                <button className='foodCategoryButtons' value="2" onClick= {hadleItemCategoryClick} >INTERMEDIATE</button>
                <button className='foodCategoryButtons' value="3" onClick= {hadleItemCategoryClick} >MAIN</button>
                <button className='foodCategoryButtons' value="4" onClick= {hadleItemCategoryClick} >DESSERT</button>

                <button className='foodCategoryButtons' value="5" onClick= {hadleItemCategoryClick}>SOFT</button>
                <button className='foodCategoryButtons' value="6" onClick= {hadleItemCategoryClick}>ALCOHOL</button>
                <button className='foodCategoryButtons' value="7" onClick= {hadleItemCategoryClick}>HOT</button>
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