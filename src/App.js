import './App.css';
import LoginPage from './components/login/login';
import HomePage from './components/home/home';
import AuthApi from './AuthApi';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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



// import './App.css';
// import LoginPage from './components/login/login';
// import HomePage from './components/home/home';
// import AuthApi from './AuthApi';
// import { BrowserRouter as Router ,Route, Routes, Switch , Navigate , Redirect } from 'react-router-dom';
// import React from 'react';
// import Cookies from 'js-cookie';
// import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory();
// function App(){

//   const [auth, setAuth] = React.useState(false);

//   const readCookie = () => {
//     const user = Cookies.get("user");
//     if(user){
//       setAuth(true);
//     }
//   }
//   React.useEffect( () =>{
//     readCookie();
//   }, [auth]);
  

//   return (
//     <Router history={history}>
//         <Switch>
//             <PrivateRoute exact path="/home" component={HomePage} />
//             <PublicRoute restricted={true} path="/login" component={LoginPage} />
//             <Redirect from="*" to="/" />
//         </Switch>
//     </Router>
// );
// }

// const PrivateRoute = ({auth , component : Component ,...rest}) => {
//   return (
//     <Route {...rest} render={props => (
//       auth ?
//           <Component {...props} />
//       : <Redirect to="/login" />
//   )}/>
//   )
// }

// const PublicRoute = ({auth , component : Component , restricted , ...rest}) => { 
//   return (
//     <Route {...rest} render={props => (
//         auth && restricted ?
//         <Redirect to="/home" />   
//         : <Component {...props} />
//     )} />
// );
// };

// export default App;