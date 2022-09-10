import React , {useState, useRef , useEffect, useContext} from 'react';
import './BartenderPage.css';
import OrderCardBeverages from './OrderCardBeverages';
import OrdersArrayContext from '../../store/OrdersArray';


const BartenderPage = (props) => {
    const [ filteredOrdersArray, setFilteredOrdersArray] = useState([]);
    const [filter, setFilter] = useState('All Orders');
    const dragItem = useRef();
    const dragOverItem = useRef();
    const ctx = useContext(OrdersArrayContext);

   useEffect(()=>{
    setFilteredOrdersArray(ctx.OrdersArray);
   }, [ctx.OrdersArray])

    const dragStart = (e, position) => {
        dragItem.current = position;    
    };
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...ctx.OrdersArray];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        ctx.setOrdersArray(copyListItems);
        setFilteredOrdersArray(copyListItems);
    };

    const updateOrdersArrayHandler = (ordersAfterUpdate) => {
        ctx.setOrdersArray(ordersAfterUpdate);
        setFilteredOrdersArray(ordersAfterUpdate);
    }

    const onFilterSelectClick = (event) => {
        const value = (event.target.value);
        console.log(value);
       
        setFilter(value);
        ctx.setOrdersArray(filteredOrdersArray);
        return;
    }

    const checkIfEmptyDishes = (order) => {
        let isEmpty = true;
        order.itemsList.forEach((item) => { 
            if( item.category > 4)
            {
                isEmpty=false;
            }
        })
        return isEmpty;
    }
   
    return (
        <div>
            <div className='title-container'>
                Bar Page
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
                { ctx.OrdersArray.map((item , index)=>{ return ( !checkIfEmptyDishes(item) ? 
                                                        filter === 'All Orders'?
                                                            <div className='order-container'
                                                                key={index} 
                                                                onDragStart={(e) => dragStart(e, index)} 
                                                                onDragEnter={(e) => dragEnter(e, index)} 
                                                                onDragEnd={drop}
                                                                draggable
                                                                >
                                                                <OrderCardBeverages orderData={item} updateOrdersArray={updateOrdersArrayHandler}/>
                                                            </div>
                                                            :
                                                            (item.status === filter ? 
                                                                <div className='order-container'
                                                                    key={index} 
                                                                    onDragStart={(e) => dragStart(e, index)} 
                                                                    onDragEnter={(e) => dragEnter(e, index)} 
                                                                    onDragEnd={drop}
                                                                    draggable
                                                                    >
                                                                    <OrderCardBeverages orderData={item} updateOrdersArray={updateOrdersArrayHandler}/>
                                                                </div>
                                                            :
                                                            null )
                                                            : null
                                                    
                                                )})}
            </div>
        </div>
    );
}
 
export default BartenderPage;