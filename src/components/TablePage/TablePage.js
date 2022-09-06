import React, { useState, useEffect,useContext} from 'react';
import TopComponent from './TopComponent';
import Dishes from './Dishes';
import TableItems from './TableItems';
import ButtomComponent from './ButtomComponent';
import './TablePage.css';
import axios from 'axios';
import OrdersArrayContext from '../../store/OrdersArray';


 

const TablePage = (props) => {
    const [tableNum , setTableNum] = useState(props.table.num_table);
    const [numSeats , setNumSeats] = useState(props.table.num_seats);
    const [totalAmount , setTotalAmount] = useState(0);
    const [numDiners , setNumDiners] = useState(2);
    const [itemsArray , setItemsArray] = useState(props.table.items_array);
    const ctx = useContext(OrdersArrayContext);
    const [orderItemsList, setOrderItemsList] = useState([]);
    const [itemNotes, setItemNotes] = useState('');
    const [itemQuantity, setItemQuantity] = useState('1');

    useEffect(()=>{
        let sum = 0 ;
        itemsArray.forEach(item => {
            sum+= parseInt(item.price);
        })
        setTotalAmount(sum);
    } ,[itemsArray]);

    const onReturnHandler = () =>{
        //console.log("Table page")
        props.onReturnRestaurantPage();
    }

    const onAddItemsToItemsArray=(newItem)=>{
        const total = parseInt(newItem.price)+ totalAmount;
        setTotalAmount(total);
        setItemsArray((prevItems)=>{
            return [ ...prevItems, newItem]
        });

        const newItemInOrder = {
            name: newItem.name,
            notes: itemNotes,
            quantity: itemQuantity,
        }

        setOrderItemsList((prevItemsList)=>{
            return [newItemInOrder, ...prevItemsList];
        });
    }

    const onDeleteItemFromItemsArray= (item)=>{
        const total = totalAmount - parseInt(item.price) ;
        setTotalAmount(total);
        const a = [...itemsArray]
        const idx = a.findIndex(elem => elem.name === item.name);
        a.splice(idx,1);
        setItemsArray(a);
    }

    const onSendClickHandler= () => {
        const newOrderBody = {
            tableNumber : tableNum,
            employeeName : "",
            employeeId: "0",
            itemsList : orderItemsList
        }
        const orderURL= 'http://localhost:3001/api/order/create';
        const createNewOrder = async () => {
            try{
                const response = await axios.post(orderURL, newOrderBody);
                if(response.status === 201)
                {
                    console.log(response.data);
                    ctx.setOrdersArray((prevOrders)=>{
                        return [response.data ,...prevOrders];
                    })
                }else{
                    console.log('Error occur');
                }
            }catch(e){

            }
        }
        createNewOrder();
        const body = {
            num_table: tableNum,
            items_array :itemsArray
        };
        const url = 'http://localhost:3001/api/tables/add_item_to_table';
        const updateTableItems = async () =>{ 
            try{
                const response = await axios.post(url, body);
                if(response.status === 200)
                {
                    console.log('200');
                    console.log(response.data);
                }else{
                    console.log('!200')
                    console.log('Error occur');
                }
            }catch(e){
                console.log('catch');
                console.log(e);
            }
        }
        updateTableItems();
        setOrderItemsList([]);
        props.onReturnRestaurantPage();
    }

    const onCheckClickHandler = () =>{
        return console.log('Check- Please');
    }

    const setQuantityHandler = (value)=> {
        setItemQuantity(value)
    }

    return( 

        <div className='table-page-container'>
            <TopComponent 
                numTable={tableNum} 
                seats={numSeats} 
                diners={numDiners} 
                amount={totalAmount} 
                onReturn={onReturnHandler}
            />
            <div className="middle-components">
                <Dishes 
                    items={itemsArray} 
                    onAddItem={onAddItemsToItemsArray}
                />
                <TableItems 
                    numTable={tableNum} 
                    items={itemsArray} 
                    onDeleteItem={onDeleteItemFromItemsArray}
                    setQuantity={setQuantityHandler}
                />
            </div>
            <ButtomComponent numTable={tableNum}
                onSendClick={onSendClickHandler}
                onCheckClick={onCheckClickHandler}
                total={totalAmount}
            />
        </div>
    );
}


export default TablePage;


/* 
 
*/