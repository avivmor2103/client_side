import React from "react";
import './TablePage.css';



const Dishes = () => {

    const handleTypeItemClick = () => {

    };

    const hadleItemCategoryClick = () => {

    }

    return (
        <div className='top divs'>
            <button className='top-category' onClick= {handleTypeItemClick}>Food</button>
            <button className='top-category' onClick= {handleTypeItemClick}>Drinks</button>

            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick} disabled >STARTERS</button>
            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick} disabled>INTERMEDIATE</button>
            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick} disabled>MAIN</button>

            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick} disabled>SOFT</button>
            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick} disabled>ALCOHOL</button>
            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick} disabled>HOT</button>
        </div>
    )
}

export default Dishes;