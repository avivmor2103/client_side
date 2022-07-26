import React, { useState } from 'react';
import {default as axios} from 'axios';
import TopComponent from './TopComponent';
import Dishes from './Dishes';
import TableItems from './TableItems';
import ButtomComponent from './ButtomComponent';
import Wrapper from '../../Helpers/Wrapper';
import './TablePage.css';


const TablePage = (props) => {
    const [tableNum , setTableNum] = useState(props.numTable);
    const [numSeats , setNumSeats] = useState(4);
    const [totalAmount , setTotalAmount] = useState(0);
    const [numDiners , setNumDiners] = useState(1);

    const onReturnHandler = () =>{
        console.log("Table page")
        props.onReturnHome();
    }

    return(
        <div>
            <TopComponent numTable={tableNum} />
            <Wrapper>
                <Dishes/>
                <TableItems numTable={tableNum}/>
            </Wrapper>
            <ButtomComponent numTable={tableNum} onReturn={onReturnHandler}/>
        </div>
       
    );
}


export default TablePage;