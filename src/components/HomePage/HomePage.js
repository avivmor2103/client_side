import React, {useEffect} from "react";
import {Link, Outlet , useLocation} from 'react-router-dom';
import CollapsibleNavbar from "../RestaurantPage/CollapsibleNavbar";
import './HomePage.css';


const HomePage = (props)=> {
    const location = useLocation();
    useEffect(()=>{
        //console.log(location.pathname.replace('/','').split('/'));
    }, [location]);

    const linkStyle = {
        color: "rgb(65, 153, 224)",
        textDecoration: "none",
        margin: "3rem",
        innerHeight : "xx-large",
    };

    const urlPathArray = location.pathname.replace('/','').split('/') ;
    return(
        <div >
            <div className='top-component' >
                <CollapsibleNavbar title={'ServEat'} />
            </div>  
            <Outlet/>
            {
                urlPathArray.length === 1 &&  urlPathArray[0].includes('home-page')?
                <div className="homw-page-container">
                    <div className="title-home-container">
                        <h2>Wellcom to ServEat</h2>
                    </div>
                    <div className="link-container">
                        <div className="any-page-link-container">
                            <Link to="restuarant-page" style={linkStyle}>Restaurant</Link>
                        </div>
                        <div className="any-page-link-container">
                            <Link to="hostesses-page" style={linkStyle}>Hostesses</Link>
                        </div>
                        <div className="any-page-link-container">
                            <Link to="restuarant-page" style={linkStyle}>Suppliers</Link>
                        </div>
                    </div>
                </div>
                : 
                null
            }
        </div>
    )
}

export default HomePage;