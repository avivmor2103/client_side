import React , {useState, useRef , useEffect} from 'react';
import {default as axios} from 'axios';
import './ChefPage.css';
import OrderCard from './OrderCard';


// const arr= [
//     {
//         orderNumber: 1,
//         date: `${new Date().toDateString()}`,
//         tableNumber: 3,
//         status: 'served',
//         ordersList: [
//             {
//                 name:'Pizza',
//                 comments: 'with Fries',
//                 amount: 1
//             },
//             {
//                 name: 'Chiken',
//                 comments: 'with Rice',
//                 amount: 1
//             },
//             {
//                 name: 'Hamburger',
//                 comments: 'with Fries',
//                 amount: 1
//             }
//         ]
//     },
//     {
//         orderNumber: 2,
//         date: `${new Date().toDateString()}`,
//         tableNumber: 4,
//         status: 'in preparation',
//         ordersList:[
//             {
//                 name:'Pizza',
//                 comments: 'with Fries',
//                 amount: 1
//             },
//             {
//                 name: 'Chiken',
//                 comments: 'with Rice',
//                 amount: 1
//             }
//         ]
//     },
//     {
//         orderNumber: 3,
//         date: `${new Date().toDateString()}`,
//         tableNumber: 5,
//         status: 'in preparation',
//         ordersList: [
//             {
//                 name:'Hamburger',
//                 comments: 'with Zuccini',
//                 amount: 1
//             },
//             {
//                 name: 'Chiken',
//                 comments: 'with Salad',
//                 amount: 1
//             }
//         ]
//     },
//     {
//         orderNumber: 4,
//         date: `${new Date().toDateString()}`,
//         tableNumber: 7,
//         status: 'in preparation',
//         ordersList:[
//             {
//                 name:'Hamburger',
//                 comments: 'with Fries',
//                 amount: 1
//             },
//             {
//                 name: 'Chiken',
//                 comments: 'with Rice',
//                 amount: 1
//             }
//         ]
//     },
//     {
//         orderNumber: 5,
//         date: `${new Date().toDateString()}`,
//         tableNumber: 5,
//         status: 'in preparation',
//         ordersList:[
//             {
//                 name:'Hamburger',
//                 comments: 'Kosher',
//                 amount: 1
//             },
//             {
//                 name: 'Pizza',
//                 comments: 'Extra cheese',
//                 amount: 1
//             }
//         ]
//     }
// ];   

const ChefPage = (props) => {
    const [ ordersArray, setOrdersArray] = useState([]);
    const [ filteredOrdersArray, setFilteredOrdersArray] = useState([]);
    const [filter, setFilter] = useState('All Orders');
    const dragItem = useRef();
    const dragOverItem = useRef();

    useEffect(()=>{
        const url = 'http://localhost:3001/api/order/all_orders';
        
        const getAllOrders = async ()=>{
            try{
                const response = await axios.get(url);
                console.log(response);
                setOrdersArray(response.data);
                setFilteredOrdersArray(response.data);
                
            }catch(e){
                console.log(e);
            }
        }
        getAllOrders();
    }, [])

    const dragStart = (e, position) => {
        dragItem.current = position;    
    };
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...ordersArray];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setOrdersArray(copyListItems);
        setFilteredOrdersArray(copyListItems);
    };

    const updateOrdersArrayHandler = (ordersAfterUpdate) => {
        setOrdersArray(ordersAfterUpdate);
        setFilteredOrdersArray(ordersAfterUpdate);
    }

    const onFilterSelectClick = (event) => {
        const value = (event.target.value);
        console.log(value);
       
        setFilter(value);
        setOrdersArray(filteredOrdersArray);
    
       
        return;
    }
   
    return (
        <div>
            <div className='title-container'>
                Chef Page
            </div>
            <div className='select-container'>
                <select className='filter-order-select' onClick={onFilterSelectClick}>
                    <option value="" disabled>Select</option>   
                    <option className='filter-option'>All Orders</option>
                    <option>Pre preparation</option>
                    <option>In preparation</option>
                    <option>Post preparation</option>                    
                </select>
            </div>
            <div className='orders-container'>
                { ordersArray.map((item , index)=>{ return filter === 'All Orders'?
                                                        <div className='order-container'
                                                            key={index} 
                                                            onDragStart={(e) => dragStart(e, index)} 
                                                            onDragEnter={(e) => dragEnter(e, index)} 
                                                            onDragEnd={drop}
                                                            draggable
                                                            >
                                                            <OrderCard orderData={item} updateOrdersArray={updateOrdersArrayHandler}/>
                                                        </div>
                                                        :
                                                        (item.status === filter ? <div className='order-container'
                                                            key={index} 
                                                            onDragStart={(e) => dragStart(e, index)} 
                                                            onDragEnter={(e) => dragEnter(e, index)} 
                                                            onDragEnd={drop}
                                                            draggable
                                                            >
                                                            <OrderCard orderData={item} updateOrdersArray={updateOrdersArrayHandler}/>
                                                        </div> 
                                                        :
                                                         null )
                                                    
                                                })}
            </div>
        </div>
    );
}
 
export default ChefPage;