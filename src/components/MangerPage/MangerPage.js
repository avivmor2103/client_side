import React from "react";
import NewTable from "./Tables/NewTable";
import RemoveTable from './Tables/RemoveTable';
import NewItem from "./Items/NewItem";
import RemoveItem from "./Items/RemoveItem";
import './MangerPage.css';
import RemoveUser from "./Users/RemoveUser";

const ManegerPage = (props) => {
    return (
        <div className="maneger-page-container">
            <div className="title-page-container">Manger-page</div>
            <div className="type-actions-container">
                <NewTable/>
                <RemoveTable/>
            </div>
            <div className="type-actions-container">
                <NewItem/>
                <RemoveItem/>
            </div>
            <div className="type-actions-container">
                <RemoveUser/>
            </div>
        </div>
    );
}

export default ManegerPage