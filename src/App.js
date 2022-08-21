import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import LoginPage from './components/login/login';
import AuthApi from './store/AuthApi';
import Cookies from 'js-cookie';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import HomePage from './components/HomePage/HomePage';
import ManegerPage from './components/MangerPage/MangerPage';
import ProfilePage from './components/ProfilePage/ProfilePage';


function App() {
  const [auth, setAuth] = useState(false);
  const [isRegistrationClicked , setIsRegistrationClicked] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }

  React.useEffect(() =>{
    readCookie();
  }, [auth]);

  
  const onClickToRegistrationPageHandler = () => {
    setIsRegistrationClicked(true);
  }

  const onReturnToLoginPageClickHandler = ()=> {
    setIsRegistrationClicked(false);
  }


  return (
      <AuthApi.Provider value={{auth , setAuth}}>
        
        <Router>
          <Routes>
            {!auth && !isRegistrationClicked ?
              <Route path="/login" element={<LoginPage onClickToRegistrationPage={onClickToRegistrationPageHandler}/>}/>
              : 
              (!auth && isRegistrationClicked ? 
                <Route path='login' element={<Navigate to='/registration' onReturnToLoginPageClick={onReturnToLoginPageClickHandler} replace/>}/> 
                : 
                <Route path="/login" element={<Navigate to='/' replace/>}/>
              )
            }
            {
              !auth && isRegistrationClicked ?
                <Route path="registration" element={ <RegistrationPage onReturnToLoginPageClick={onReturnToLoginPageClickHandler}/>} />
                :
                <Route path="/registration" element={<Navigate to="/login" onClickToRegistrationPage={onClickToRegistrationPageHandler} replace/>}/>
            }
             <Route path="/" element={ <Navigate to="home-page"/>}/> 
            {
              auth && !isRegistrationClicked?
                <Route path='/home-page/*' element={<HomePage/>}>
                  <Route path="restuarant-page" element={<RestaurantPage/>}/>
                  <Route path="maneger-page" element={<ManegerPage />}/>
                  <Route path="profile-page" element={ <ProfilePage />}/> 
                </Route>
              :
              ( 
                !auth && !isRegistrationClicked ?
                <Route path='/home-page/*' element={<Navigate to="/login" replace/>}/>
                :
                <Route path='/home-page/*' element={ <Navigate to="/registration" replace/>}/> 
              )
            }
          </Routes>
        </Router>
      </AuthApi.Provider>
  );
}
export default App;
/////////////////////////////////////////////////////////////////////////////////////////////////
//To save for another option
/* 
{/* { auth && !isChoosenTable ?
              <Route path="/" element={<RestaurantPage onSwitchTable={onSwitchToTablePageHandler} numSeatsUpdateHandler={numSeatsUpdateHandlerFunction}/>}/> 
              : ( auth && isChoosenTable ? 
              <Route path="/" element={<Navigate to="/table" replace numTable={tableNumber} onReturnRestaurantPage={onReturnRestaurantPageHandler}/>}/> 
                  : <Route path="/" element={<Navigate to='/login' onClickToRegistrationPage={onClickToRegistrationPageHandler} replace/>}/>)
            } */
/*
            {/* { auth && isChoosenTable ? 
              <Route path="/table" element={<TablePage numTable={tableNumber} numSeats={numSeats} onReturnRestaurantPage={onReturnRestaurantPageHandler}/>}/> 
              : (auth && !isChoosenTable ? <Route path='/table' element={<Navigate to="/" replace/>}/> 
              : <Route path='/table' element={<Navigate to="/login" onClickToRegistrationPage={onClickToRegistrationPageHandler} replace/>}/>)
            } */

// import HomePage from './components/HomePage/HomePage';
// import TablePage from './components/TablePage/TablePage';
// const [isChoosenTable , setIsChoosenTable] = useState(false);
// const [tableNumber, setTableNumber] = useState('');
// const [numSeats, setNumSeats] = useState(0);

// const onSwitchToTablePageHandler = (tableNumber) =>{
  //   setTableNumber(tableNumber);
  //   setIsChoosenTable(true);
  // }

  // const onReturnRestaurantPageHandler = () => {
  //   setIsChoosenTable(false);
  // }

  // const numSeatsUpdateHandlerFunction=(enteredNumeSeats)=> {
  //   setNumSeats(enteredNumeSeats);
  // }



/////////////////////////////////////////////////////////////////////////////////////////////////
//To save for using nested Routes
// return(
  //   <AuthApi.Provider value={{auth, setAuth}}>
  //       <Router>
  //         <Routes>
  //           { auth ? <Route path="/" element={<HomePage/>}/> : <Route path="/" element={<Navigate to='/login' replace />} />}
  //           {!auth ? <Route path="/login" element={<LoginPage/>}/> : <Route path="/login" element={<Navigate to='/' replace/>}/>}
  //         </Routes>
  //       </Router>
  //   </AuthApi.Provider>
  // );

///////////////////////////////////////////////////////////////////////////////////////////////


/*
,
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
*/

/* 
<Router>
          <Routes>
            { auth ? 
                <Route path="/" element={<RestaurantPage/>}/> : 
                  ( !auth && !isRegistrationClicked ? 
                    <Route path="/" element={<Navigate to='/login' onClickToRegistrationPage={onClickToRegistrationPageHandler} replace/>}>
                      {/* <Route path="/" element={<TablePage/>}/> }
                     /* </Route> 
                      : 
                      <Route path="/" element={<Navigate to='/registration' onReturnToLoginPageClick={onReturnToLoginPageClickHandler} replace/>}/>
                    )
              }
  
              { !auth && !isRegistrationClicked ?
                  <Route path="/login" element={<LoginPage onClickToRegistrationPage={onClickToRegistrationPageHandler}/>}/>:
                    (!auth && isRegistrationClicked ? 
                      <Route path='login' element={<Navigate to='/registration' onReturnToLoginPageClick={onReturnToLoginPageClickHandler} replace/>}/> : 
                      <Route path="/login" element={<Navigate to='/' replace/>}/>
                    )
              }
  
              { !auth && isRegistrationClicked ?
                  <Route path="/registration" element={<RegistrationPage onReturnToLoginPageClick={onReturnToLoginPageClickHandler}/>}/> :
                  <Route path="/registration" element={<Navigate to="/login" onClickToRegistrationPage={onClickToRegistrationPageHandler} replace/>}/>
              }
  
            </Routes>
          </Router>
*/