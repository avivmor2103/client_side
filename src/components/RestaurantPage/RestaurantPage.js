//import AuthApi from '../../store/AuthApi.js';
import './RestaurantPage.css';
import React, {useState, useRef} from 'react';
import {default as axios} from 'axios';
import TableButton from './TableButton';
import TablePage from '../TablePage/TablePage';

const RestaurantPage = (props) => {

    const [state , setState] = useState({
        table :"",
        erea : "" ,
        tablesArray : [],
        tableDate : false
    });
    const [tableChoise  , setTableChoise] = useState(null); 
    const [isChoosenTable , setIsChoosenTable] = useState(false);
    const selectInputRef = useRef();

    const chooseEreaClick = event => {
       
        const value = event.target.value;
        if(value === '0')
            return;

        const newState = {
            ...state,
            erea : value, tablesArray : []
        };

        setState((prevState)=> {
            return {...prevState, erea: value, tablesArray: []}
        });
        const ereaType = { erea : newState.erea };
        const url = process.env.REACT_APP_API_PATH + '/tables/erea/' + ereaType.erea ;
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }

        const ereaTables = async () => {
            try{
                const response = await axios.get(url , config);
                const newState = {
                    ...state,
                    tablesArray :  response.data.sort((a,b)=>{
                        return parseInt(a.num_table) - parseInt(b.num_table);
                    })
                };
                setState((prevState)=>{
                    return {...prevState, tablesArray: response.data};
                });
            }catch(e){
                console.log(e);
            }
        }
        ereaTables();

    }

    const handlerTableClicked = (table) => {
        setTableChoise(table);
        setIsChoosenTable(true);
        const newState = {
            ...state,
            tablesArray : []
        };

        setState(newState);
    }
    
    const numSeatsUpdateHandler =(numSeats)=>{ 
        console.log(numSeats);
    }

    const onReturnRestaurantPageHandler = () => {
        setIsChoosenTable(false);
    }

    return(
            <div className='restaurantPage-component'>
            { !isChoosenTable ?
                <>
                    <div className='main-container'>
                        <h3 className="section-title">Select Erea</h3>
                        <select ref={selectInputRef} className='select-section' onChange={chooseEreaClick}>
                            <option className='selection-option' value="0">Select</option>
                            <option className='selection-option' value="1">Floor</option>
                            <option className='selection-option' value="2">Bar</option>
                            <option className='selection-option' value="3">Garden</option>
                            <option className='selection-option' value="4">Terrace</option>
                        </select>
                    </div>

                    <div className='button-section'>
                        {state.tablesArray.length > 0 ? 
                        
                            <div className='table-title'>Choose Table No.</div>: null }
                            <div className='buttons-container'>
                                {state.tablesArray.map((tableNumber, index) => {
                                    return <TableButton table={tableNumber} key={index} onClickTable={handlerTableClicked} numSeatsUpdate={numSeatsUpdateHandler} />
                                })}
                            </div> 
                    </div>
                </>: <TablePage table={tableChoise} onReturnRestaurantPage={onReturnRestaurantPageHandler}/>
            
            }
            </div>
    );
};

export default RestaurantPage ;