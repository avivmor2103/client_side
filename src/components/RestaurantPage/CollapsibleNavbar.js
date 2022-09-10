import React, {useState} from "react";
import { NavLink} from "react-router-dom";
import AuthApi from "../../store/AuthApi";
import './CollapsibleNavbar.css';
import axios from "axios";
import Hamburger from "../../UI/Hamburger";
import Cookies from 'js-cookie';
import {MdFlatware,MdManageAccounts,MdRestaurant,MdOutlineManageAccounts, MdLogout } from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import { FaUserClock} from "react-icons/fa";




const CollapsibleNavbar = (props)=> {
    const [isOpenHamburger, setIsOpenHamburger] = useState(false);
    const [ isManeger , setIsManeger] = useState(false);
    const [ isChef, setIsChef] = useState(false);

    const ctx = React.useContext(AuthApi);
    const onClickTaggleHampurgerHandler = () => {
        if(!isOpenHamburger)
            setIsOpenHamburger(true);
        else
            setIsOpenHamburger(false);
    }

    const logoutClickHandler = ()=> {
        const userEmail = Cookies.get("user");

        const requestBody = {email : userEmail};
        const url = 'http://localhost:3001/api/user/logout';
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const logoutRequest = async () => {

            try {
                const body = JSON.stringify(requestBody);
                const response = await axios.post( url, body , config );
                if (response.status === 200) {
                    ctx.setAuth(false);
                    Cookies.remove("user");
                    console.log("Disconnected from the system");
                  
                }else{
                    const error = await response.text();
                    console.log(error);
                }
            } catch(e) {
                console.log(e);
            }
        }
        logoutRequest();
    }

    const setNavLinks = () => {
        const url = 'http://localhost:3001/api/user/all_users';
        const config={   
            headers:{
                'Content-Type':'application/json'
            }
        }
        
        const getPosition = async () => {

            try {
                const response = await axios.get( url , config );
                if (response.status === 200) {
                    const users = [...response.data];
                    const email = Cookies.get("user");
                    const user = users.find(item => item.email === email);
                    //console.log(user);
                    if(user.position === "Chef"){
                        setIsChef(true);
                    }
                    if(user.position === "Manager"){
                        setIsManeger(true);
                    }

                }else{
                    const error = await response.text();
                    console.log(error);
                }
            } catch(e) {
                console.log(e);
            }
        }
        getPosition();
    }

    setNavLinks();


    return(
        <div className="navbar-container">
            <div className="navbar-header">
                <div  onClick={onClickTaggleHampurgerHandler} className="burger-nav-container">
                    <Hamburger />
                </div>
                <div className="title-conatiner">
                    <MdFlatware/>
                    <NavLink to='' className={({ isActive }) =>
                        ["nav-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                    }>{props.title}</NavLink>
                </div>
            </div>
            { 
                isOpenHamburger &&
                <div className="navigation">
                    <div className="link-icon-container">
                        <FaUserClock/>
                        <NavLink to='attendance-page' className={({ isActive }) =>
                                ["nav-link", isActive ? "active" : null]
                                .filter(Boolean)
                                .join(" ")
                            }>Attendance</NavLink> 
                        {/* <div className="navbar-option" onClick={onAttendancePageClickHandler}>Attendance</div> */}
                    </div>
                    
                    <div className="link-icon-container">
                        <BiDrink/>
                        <NavLink to='bartender-page' className={({ isActive }) =>
                                ["nav-link","bar-link", isActive ? "active" : null]
                                .filter(Boolean)
                                .join(" ")
                            }>Bartender</NavLink> 
                    </div>

                    {isManeger ? 
                        <div className="link-icon-container">
                            <MdManageAccounts className="icon-profile"/>
                            <NavLink to='maneger-page' className={({ isActive }) =>
                                ["nav-link","manager-link", isActive ? "active" : null]
                                .filter(Boolean)
                                .join(" ")
                            }>Maneger</NavLink> 
                        </div>  
                        :
                        null
                    }
                    <div className="link-icon-container">
                        <MdOutlineManageAccounts/>
                        <NavLink to='Profile-page' className={({ isActive }) =>
                        ["nav-link","profile-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                        }>Profile</NavLink>
                    </div>
                    <div  className="link-icon-container">
                        <MdRestaurant />
                        <NavLink to='restuarant-page' className={({ isActive }) =>
                        ["nav-link","rest-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                        }>Restaurant</NavLink>
                    </div>
                    
                    { isChef? 
                        <div className="link-icon-container">
                            <MdManageAccounts/>
                            <NavLink to='chef-page' className={({ isActive }) =>
                            ["nav-link", 'chef-page', isActive ? "active" : null]
                            .filter(Boolean)
                            .join(" ")
                            }>Chef</NavLink>
                        </div>
                        :
                        null
                    }
                    <div className="logout-container">
                        <MdLogout/>
                        <div className="navbar-option" onClick={logoutClickHandler}>Logout</div>
                    </div>
                </div>
            }
        </div>

    );
};

export default CollapsibleNavbar; 

/* <Link to="maneger-page" style={linkStyle}>Maneger</Link>
                    <Link to="Profile-page" style={linkStyle}>Profile</Link>
                    <Link to="restuarant-page" style={linkStyle}>Restaurant</Link> */