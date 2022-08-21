import React, {useState} from "react";
import { Link , NavLink} from "react-router-dom";
import AuthApi from "../../store/AuthApi";
import './CollapsibleNavbar.css';
import axios from "axios";
import Hamburger from "../../UI/Hamburger";
import Cookies from 'js-cookie';


const CollapsibleNavbar = (props)=> {
    const [isOpenHamburger, setIsOpenHamburger] = useState(false);
    const ctx = React.useContext(AuthApi);
    const onClickTaggleHampurgerHandler = () => {
        if(!isOpenHamburger)
            setIsOpenHamburger(true);
        else
            setIsOpenHamburger(false);
    }

    const onAttendancePageClickHandler = (props)=>{
        console.log('attendence page')
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


    return(
        <div className="navbar-container">
            <div className="navbar-header">
                <div  onClick={onClickTaggleHampurgerHandler} className="burger-nav-container">
                    <Hamburger />
                </div>
                <div className="title-conatiner">
                <Link to="">{props.title}</Link>
                </div>
            </div>
            { 
                isOpenHamburger &&
                <div className="navigation">
                    <div className="navbar-option" onClick={onAttendancePageClickHandler}>Attendance</div>
                    <NavLink to='maneger-page' className={({ isActive }) =>
                        ["nav-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                    }>Maneger</NavLink>
                    <NavLink to='Profile-page' className={({ isActive }) =>
                        ["nav-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                    }>Profile</NavLink>
                    <NavLink to='restuarant-page' className={({ isActive }) =>
                        ["nav-link", isActive ? "active" : null]
                        .filter(Boolean)
                        .join(" ")
                    }>Restaurant</NavLink>
                    <div className="navbar-option">Chef</div>
                    <div className="navbar-option" onClick={logoutClickHandler}>Logout</div>
                </div>
            }
        </div>

    );
};

export default CollapsibleNavbar; 

/* <Link to="maneger-page" style={linkStyle}>Maneger</Link>
                    <Link to="Profile-page" style={linkStyle}>Profile</Link>
                    <Link to="restuarant-page" style={linkStyle}>Restaurant</Link> */