import React from 'react';
import './OrderCard.css';

const OrderCard = (props) => {
    return (
        <div className='order-card-container'>
            <div className='detailes-container'>
                <div>Order No. {props.orderData.orderNumber}</div>
                <div>Date {props.orderData.date}</div>
                <div>Table No.{props.orderData.tableNumber}</div>
                <div>Status: {props.orderData.status}</div>
            </div>
            <div className='items-table-container'>
                <div className='column-container'>
                    <div  className='row-container'>Item Name</div>
                    {
                        props.orderData.ordersList.map((item, index)=> { return <div key={index}>{item.name}</div>})
                    }
                </div>
                <div className='column-container'>
                    <div className='row-container'>Comments</div>
                    {
                        props.orderData.ordersList.map((item, index)=> { return <div key={index}>{item.comments}</div>})
                    }
                </div>
                <div>
                    <div className='row-container'>Amount</div>
                    {
                        props.orderData.ordersList.map((item, index)=> { return <div key={index}>{item.amount}</div>})
                    }
                </div>
                {/* <div>
                    {
                        props.orderData.ordersList
                    }
                </div> */}
                
            </div>
        </div>
    );
}
 
export default OrderCard;