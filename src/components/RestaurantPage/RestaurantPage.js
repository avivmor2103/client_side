import AuthApi from '../../store/AuthApi.js';
import './RestaurantPage.css';
import React, {useState, useRef} from 'react';
import {default as axios} from 'axios';
import TableButton from './TableButton';
import TablePage from '../TablePage/TablePage'
// import CollapsibleNavbar from './CollapsibleNavbar';
// import ManegerPage from '../MangerPage/MangerPage.js';
// import ProfilePage from '../ProfilePage/ProfilePage.js';

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
    //const ctx = React.useContext(AuthApi);

    const chooseEreaClick = event => {
        const value = event.target.value;
        if(value === '0')
            return;
        const newState = {
            ...state,
            erea : value, tablesArray : []
        };

        setState(newState);
        const ereaType = { erea : newState.erea };
        const url = 'http://localhost:3001/api/tables/erea/' + ereaType.erea ;
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
                setState(newState);
            }catch(e){
                console.log(e);
            }
        }
        ereaTables();

    }
    
    // const logoutClickHandler = ()=> {
    //     const userEmail = Cookies.get("user");
    //     //console.log(userEmail) ;

    //     const requestBody = {email : userEmail};
    //     const url = 'http://localhost:3001/api/user/logout';
    //     const config={   
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     }

        
    //     const logoutRequest = async () => {

    //         try {
    //             const body = JSON.stringify(requestBody);
    //             const response = await axios.post( url, body , config );
    //             if (response.status === 200) {
    //                 ctx.setAuth(false);
    //                 Cookies.remove("user");
    
    //                 const newState = {
    //                     ...state,
    //                     msg:'Loged-out succesfully'
    //                 };
    
    //                 setState(newState);
    //                 console.log("Disconnected from the system");
                  
    //             }else{
    //                 const error = await response.text();
    //                 setState({msg : error});
    //             }
    //         } catch(e) {
    //             console.log(e);
    //         }
    //     }
    //     logoutRequest();
    // }

    const handlerTableClicked = (table) => {
        //console.log(table.num_table, table.num_seats);
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
                {/* <div className='top-component' >
                    <CollapsibleNavbar title={'ServEat'} logoutClick={logoutClickHandler}/>
                </div> */}
            { !isChoosenTable ?
                <>
                    {/* <div className='top-component' >
                        <CollapsibleNavbar title={'Tabit-App'} logoutClick={logoutClickHandler}/>
                    </div> */}
                    <div className='main-container'>
                        <h3 className="section-title">Select Erea</h3>
                        <select ref={selectInputRef} className='select-section' onClick={chooseEreaClick}>
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
                            <div className='bottons-container'>
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