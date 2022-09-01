import axios from 'axios';
import React , {useState} from 'react';
import './OrderCard.css';

const OrderCard = (props) => {

    const [orderStatus , setOrderStatus] = useState(props.orderData.status);

    const selectOrderStatus = (event) => {
        setOrderStatus(event.target.value);
        const url = 'http://localhost:3001/api/order/update_status';
        const body = {
            newStatus : (event.target.value),
            orderNumber : props.orderData.numOrder
        }

        const updateOrderStatus = async () => {
            
            try{
                const response = await axios.put(url , body);
                props.updateOrdersArray(response.data);
            }catch(e){
                console.log(e);
            }
        }
        updateOrderStatus();
    }

    const onDeleteOrderFromArray = () => {
        const url = 'http://localhost:3001/api/order/delete/' + props.orderData.numOrder;

        const deleteOrder = async () => { 
            try { 
                const response = await axios.delete(url);
                props.updateOrdersArray(response.data);
            }catch(e){
                console.log(e);
            }
        }
        deleteOrder();
    }

    
    return (
        <div className= {orderStatus === "Pre preparation"? 'order-card-container' : ( orderStatus === 'In preparation'? 'order-card-container-in' : 'order-card-container-post')}>
            <div className='top-card-div'>
                <div className='detailes-container'>
                    <div>Order No. {props.orderData.numOrder}</div>
                    <div>Date {props.orderData.date}</div>
                    <div>Time {props.orderData.time}</div>
                    <div>Table No.{props.orderData.tableNumber}</div>
                    <div>Employee: {props.orderData.employeeName}</div>
                </div>
                <button onClick={onDeleteOrderFromArray}>X</button>
            </div>
            <div className='items-table-container'>
                <div className='column-container'>
                    <div  className='row-container'>Name</div>
                    {
                        props.orderData.itemsList.map((item, index)=> { return <div key={index}>{item.name}</div>})
                    }
                </div>
                <div className='column-container'>
                    <div className='row-container'>Notes</div>
                    {
                        props.orderData.itemsList.map((item, index)=> { return <div key={index}>{item.notes}</div>})
                    }
                </div>
                <div>
                    <div className='row-container'>Quantity</div>
                    {
                        props.orderData.itemsList.map((item, index)=> { return <div key={index}>{item.quantity}</div>})
                    }
                </div>
                
            </div>
            <select onClick={selectOrderStatus} className="select-status">
                    <option>{orderStatus}</option>
                    <option>Pre preparation</option>
                    <option>In preparation</option>
                    <option>Post preparation</option>

            </select>
        </div>
    );
}
 
export default OrderCard;