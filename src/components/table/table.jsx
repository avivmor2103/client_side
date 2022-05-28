import React from 'react';
import {default as axios} from 'axios';
// import Cookies from 'js-cookie';
// import AuthApi from '../../AuthApi.js';

const Table = () => {

    const [state , setState] = React.useState({
        numTable :"",
        numDiners : 0 ,
        numSeats : 0 ,
        totalAmount : 0 
    });

    
    return(
        <div>
            <TopComponent/>
            <br/>
            <Dishes/>
            <br/>
            <TableItems/>
            <br/>
            <ButtomComponent/>
        </div>
       
    )
}

const Dishes = () => {

    const handleTypeItemClick = () => {

    };

    const hadleItemCategoryClick = () => {

    }

    return (
        <div>
            <button onClick= {handleTypeItemClick}>Food</button>
            <button onClick= {handleTypeItemClick}>Drinks</button>

            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick}>STARTERS</button>
            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick}>INTERMEDIATE</button>
            <button className='foodCategoryButtons' onClick= {hadleItemCategoryClick}>MAIN</button>

            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick}>SOFT</button>
            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick}>ALCOHOL</button>
            <button className='drinksCategoryButtons' onClick= {hadleItemCategoryClick}>HOT</button>
        </div>
    )
}

const TopComponent = () => {

    const [state , setState] = React.useState({
        numTable :""
    });

    return (
        <div>
            <h2>Table #{state.numTable}</h2>
        </div>
    );
}

const TableItems = () => {
    const [state , setState] = React.useState({
        numTable :""
    });

    return (
        <div>

        </div>
    );
}

const ButtomComponent = () =>{ 
    const [state , setState] = React.useState({
        numSeats :"",
        numDiners: 0
    });

    return(
        <div>
            <div>
                <h4><b>Table Detailes :</b></h4>
            </div>
            <div>
                <lable>                    
                    <b>
                    Number Diners: {state.numDiners}
                    </b>
                </lable>
                    <br/>
                <lable>
                    <b>
                    Number Seats : {state.numSeats}
                    </b>
                </lable>
            </div>
            <div>
                <lable>
                    <b>
                        Total Check :
                    </b>
                </lable>
            </div>
        </div>  
    );
}