import React from "react";
import './TablePage.css';
import Card from "../../UI/Card";




const TableItems = (props) => {

    const deleteItemClick = (item) => {
        console.log(item);
        props.onDeleteItem(item);
    }

    return (
        <div className="middle-right-container">
            <div className="middle-right-title">TableItems</div>
            <div className="table-items-container">
                {
                    props.items.map( (item, index)=>{
                        //console.log(item);
                        return <Card key={index} name={item.name} price={item.price} item={item} onDelete={deleteItemClick}/>
                    })
                }
            </div>
        </div>
    );
}

export default TableItems;