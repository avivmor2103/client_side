import axios from 'axios';
import React , {useState} from 'react';
import './OrderCard.css';
import { FaTrashAlt } from "react-icons/fa";


const OrderCard = (props) => {

    const [orderStatus , setOrderStatus] = useState(props.orderData.status);

    const selectOrderStatus = (event) => {
        setOrderStatus(event.target.value);
        const url = process.env.REACT_APP_API_PATH + '/order/update_status';
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
        const url = process.env.REACT_APP_API_PATH + '/order/delete/' + props.orderData.numOrder;

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
                <button id="trash-btn" onClick={onDeleteOrderFromArray}><FaTrashAlt/></button>
            </div>
            <div className='items-table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Notes</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        { props.orderData.itemsList.map((item, key) => {
                        return ( item.category <= 4 ?
                            <tr key={key}>
                                <td>{item.name}</td>
                                <td>{item.notes}</td>
                                <td>{item.quantity}</td>
                            </tr>
                            : null)
                        })}
                    </tbody>
                </table>
                
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