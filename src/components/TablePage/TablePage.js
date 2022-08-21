import React, { useState, useEffect} from 'react';
import TopComponent from './TopComponent';
import Dishes from './Dishes';
import TableItems from './TableItems';
import ButtomComponent from './ButtomComponent';
import './TablePage.css';
import axios from 'axios';


const TablePage = (props) => {
    const [tableNum , setTableNum] = useState(props.table.num_table);
    const [numSeats , setNumSeats] = useState(props.table.num_seats);
    const [totalAmount , setTotalAmount] = useState(0);
    const [numDiners , setNumDiners] = useState(2);
    const [itemsArray , setItemsArray] = useState(props.table.items_array);

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
            return [ newItem, ...prevItems]
        });
        //console.log(itemsArray);
    }

    const onDeleteItemFromItemsArray= (item)=>{
        //console.log(itemsArray);
        const total = totalAmount - parseInt(item.price) ;
        setTotalAmount(total);
        const a = [...itemsArray]
        const idx = a.findIndex(elem => elem.name === item.name);
        a.splice(idx,1);
        //console.log(a);
        setItemsArray(a);
    }

    const onSendClickHandler= () => {
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
        props.onReturnRestaurantPage();
        // itemsArray.forEach( elem => {
        //     console.log(elem);
        // });
    }

    const onCheckClickHandler = () =>{
        return console.log('Check- Please');
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