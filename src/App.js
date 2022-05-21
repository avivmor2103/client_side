import './App.css';
import LoginPage from './components/login/login';
import HomePage from './components/home/home';
import AuthApi from './AuthApi';
import { BrowserRouter as Router ,Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = React.useState(false) 
  const readCookie = () => {
    const user = Cookies.get("user");
    console.log(user);
    if(user){
      setAuth(true);
      console.log(auth);
    }
  }
  React.useEffect( () =>{
    readCookie();
    console.log(auth); 
  }, [auth]);

  return(
    <div>
      <AuthApi.Provider value={{auth, setAuth}}>
        <Router>
          <UpRoutes/>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}


const UpRoutes= () => {
  const Auth = React.useContext(AuthApi);
    return (
      <Routes>
          <ProtectedLogin  path="/login" component={LoginPage} auth={Auth.auth}/>
          <ProtectedRoute exect path="/" auth={Auth.auth} component={HomePage} />
      </Routes>
    )
}

const ProtectedRoute = ({auth , component : Component , ...rest}) => {
  return( 
    <Route 
    // {...rest}
    // render = {() => auth? (
    //    <Component/>
    // ) : ( 
    //   <Redirect to="/login"/>
    // )}
    path='/'
    element={auth ?  <Navigate to='/'/> : <Navigate to='/login'/> } 
    />
  );
};

const ProtectedLogin = ({auth , component : Component , ...rest}) => {
  return(
  //   <Route 
  //   {...rest}
  //   render = {() => !auth? (
  //     <Component/>
  //   ) : (
  //     <Redirect to="/"/>
  //   )}
  //   ></Route>
  // );
  <Route
  path='/login'
  element={auth ?  <Navigate to='/'/> : <Navigate to='/login'/> } 
  />)
};

export default App;