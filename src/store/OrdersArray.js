import React, { useState, useEffect} from "react";
import axios from "axios";
const OrdersArrayContext = React.createContext({
    OrdersArray: [] ,
    setOrdersArray : (orders)=>{}
});


export const OrdersContextProvider = (props)=> {


    const [ordersArray, setOrdersArray] = useState([]);

    useEffect(()=>{
        const url = 'http://localhost:3001/api/order/all_orders';
        
        const initOrders = async () =>{
          try{
            const response = await axios.get(url);
            setOrdersArray(response.data);
          }catch(e){
            console.log(e);
          }
        }
        initOrders();
      }, [])


    
    return(
        <OrdersArrayContext.Provider 
            value={{
                OrdersArray: ordersArray,
                setOrdersArray: setOrdersArray
            }}
        >
            {props.children}
        </OrdersArrayContext.Provider>
    );
}

export default OrdersArrayContext;


