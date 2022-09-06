import React, {useEffect } from "react";
import "./ShowTables.css";
import "./HostessPage.css";
import { Link, Outlet,useLocation} from "react-router-dom";

const HostessPage = () => {

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
  return (
    <div className="links-container">
      <Outlet/>
        {
          urlPathArray.length === 2 &&  urlPathArray[1].includes('hostess-page')? 
          <div className="links-div"> 
            <div className="any-page-link-container">
              <Link to="new-reservation" style={linkStyle}>New Reservation</Link>
            </div>
            <div className="any-page-link-container">
            <Link to="update-reservation" style={linkStyle}>Update Reservation</Link>
            </div>
            <div className="any-page-link-container">
            <Link to="delete-reservation" style={linkStyle}>Delete Reservation</Link>
            </div>
          </div>
          : 
          null
        }
    </div>
  );
};

export default HostessPage;