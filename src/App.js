import './App.css';
import LoginPage from './components/login/login';
import HomePage from './components/home/home';
import AuthApi from './AuthApi';
import { BrowserRouter as Router ,Route, Routes, Switch , Navigate , Redirect } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = React.useState(false) 
  const readCookie = () => {
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }
  React.useEffect( () =>{
    readCookie();
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
      <>
      <Switch>
        <ProtectedLogin auth={Auth.auth} path="/login" component={LoginPage}/>
      </Switch>
      <Switch>
        <ProtectedRoute exect path="/"  component={HomePage} auth={Auth.auth} />
      </Switch>
      </>
    )
}

const ProtectedRoute = ({auth , component : Component , ...rest}) => {
  return( 
    <Route
    {...rest}
    render = {() => auth ? (
       <Component/>
    ) : ( 
      <Redirect to="/login"/>
    )}
    />
  );
};

const ProtectedLogin = ({auth , component : Component , ...rest}) => {
  return(
    <Route 
    
    {...rest}
    render = {() => !auth? (
      <Component/>
    ) : (
      <Redirect to="/"/>
    )}
    />
  );
};

export default App;