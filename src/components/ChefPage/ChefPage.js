import React , {useState, useRef} from 'react';
import './ChefPage.css';
import OrderCard from './OrderCard';

const arr= [
    {
        orderNumber: 1,
        date: `${new Date().toDateString()}`,
        tableNumber: 3,
        status: 'served',
        ordersList: [
            {
                name:'Pizza',
                comments: 'with Fries',
                amount: 1
            },
            {
                name: 'Chiken',
                comments: 'with Rice',
                amount: 1
            },
            {
                name: 'Hamburger',
                comments: 'with Fries',
                amount: 1
            }
        ]
    },
    {
        orderNumber: 2,
        date: `${new Date().toDateString()}`,
        tableNumber: 4,
        status: 'in preparation',
        ordersList:[
            {
                name:'Pizza',
                comments: 'with Fries',
                amount: 1
            },
            {
                name: 'Chiken',
                comments: 'with Rice',
                amount: 1
            }
        ]
    },
    {
        orderNumber: 3,
        date: `${new Date().toDateString()}`,
        tableNumber: 5,
        status: 'in preparation',
        ordersList: [
            {
                name:'Hamburger',
                comments: 'with Zuccini',
                amount: 1
            },
            {
                name: 'Chiken',
                comments: 'with Salad',
                amount: 1
            }
        ]
    },
    {
        orderNumber: 4,
        date: `${new Date().toDateString()}`,
        tableNumber: 7,
        status: 'in preparation',
        ordersList:[
            {
                name:'Hamburger',
                comments: 'with Fries',
                amount: 1
            },
            {
                name: 'Chiken',
                comments: 'with Rice',
                amount: 1
            }
        ]
    },
    {
        orderNumber: 5,
        date: `${new Date().toDateString()}`,
        tableNumber: 5,
        status: 'in preparation',
        ordersList:[
            {
                name:'Hamburger',
                comments: 'Kosher',
                amount: 1
            },
            {
                name: 'Pizza',
                comments: 'Extra cheese',
                amount: 1
            }
        ]
    }
];   

const ChefPage = (props) => {
    const [ ordersArray, setOrdersArray] = useState(arr);
    const dragItem = useRef();
    const dragOverItem = useRef();

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
    };
   
    return (
        <div>
            <div className='title-container'>
                Chef Page
            </div>
            <div className='orders-container'>
                { ordersArray.map((item , index)=>{ return (<div className='order-container'
                                                        key={index} 
                                                        onDragStart={(e) => dragStart(e, index)} 
                                                        onDragEnter={(e) => dragEnter(e, index)} 
                                                        onDragEnd={drop}
                                                        draggable>
                                                            <OrderCard orderData={item}/>
                                                        </div>)})}
            </div>
        </div>
    );
}
 
export default ChefPage;