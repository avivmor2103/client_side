import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import LoginPage from './components/login/login';
import RestaurantPage from './components/home/home';
import AuthApi from './AuthApi';
import TablePage from './components/TablePage/TablePage';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = useState(false);
  const [isChoosenTable , setIsChoosenTable] = useState(false);
  const [tableNumber, setTableNumber] = useState('');

  const readCookie = () => {
    const user = Cookies.get("user");
    if(user){
      setAuth(true);
    }
  }

  React.useEffect(() =>{
    readCookie();
  }, [auth]);

  const onSwitchToTablePageHandler = (tableNumber) =>{
    setTableNumber(tableNumber);
    setIsChoosenTable(true);
  }

  const onReturnHomeHandler = () => {
    setIsChoosenTable(false);
  }

  return (
      <AuthApi.Provider value={{auth , setAuth}}>
        <Router>
          <Routes>
            { auth && !isChoosenTable ?
              <Route path="/" element={<RestaurantPage onSwitchTable={onSwitchToTablePageHandler}/>}/> 
              : ( auth && isChoosenTable ? 
              <Route path="/" element={<Navigate to="/table" replace numTable={tableNumber} onReturnHome={onReturnHomeHandler}/>}/> 
                  : <Route path="/" element={<Navigate to='/login' replace/>}/>)}
            { !auth ?<Route path="/login" element={<LoginPage/>}/> : <Route path="/login" element={<Navigate to='/' replace/>}/>}
            { auth && isChoosenTable ? 
              <Route path="/table" element={<TablePage numTable={tableNumber} onReturnHome={onReturnHomeHandler}/>}/> 
              : (auth && !isChoosenTable ? <Route path='/table' element={<Navigate to="/" replace/>}/> 
              : <Route path='/table' element={<Navigate to="/login" replace/>}/>)}
          </Routes>
        </Router>
      </AuthApi.Provider>
  );
}
export default App;

// return(
  //   <div>
  //     <AuthApi.Provider value={{auth, setAuth}}>
  //       <Router>
  //         <Switch>
  //           {/* <Route path="/login">
  //             { !auth ?  <LoginPage/> : <Redirect to='/'/>}
  //           </Route>
  //           <Route exect path="/">
  //             { auth && !isChoosenTable ? ( <RestaurantPage onSwitchTable={onSwitchToTablePageHandler}/>) : ( auth && isChoosenTable ? <Redirect to="/table"/> : <Redirect to="/login"/>)}
  //           </Route>
  //           <Route path="/table">
  //             { (auth && isChoosenTable)? (<TablePage numTable={tableNumber}/>) : (<Redirect to="/"/>)}
  //           </Route> */}

  //           <ProtectedLogin auth={auth} path="/login" component={LoginPage} />     
  //           {/* <RouteTable component={TablePage} path='/table' auth={auth} isChoosenTable={isChoosenTable} tableNumber={tableNumber}/>
  //           <ProtectedRoute exect path="/" component={RestaurantPage} isChoosenTable={isChoosenTable} auth={auth} onSwitchToTablePage={onSwitchToTablePageHandler} tableNumber={tableNumber}/> */}
  //         </Switch>
  //         <Switch>
  //           <RouteTable component={TablePage} path='/' auth={auth} isChoosenTable={isChoosenTable} tableNumber={tableNumber}/>
  //         </Switch>
  //         <Switch>
  //           <ProtectedRoute exect path="/" component={RestaurantPage} isChoosenTable={isChoosenTable} auth={auth} onSwitchToTablePage={onSwitchToTablePageHandler} tableNumber={tableNumber}/>
  //         </Switch>
  //       </Router>
  //     </AuthApi.Provider>
  //   </div>
  // );

// const ProtectedRoute = ({props, isChoosenTable, auth , component : Component , ...rest}) => {
//   const switchTable = (numTable) => {
//     console.log(numTable);
//     rest.onSwitchToTablePage(numTable);
//   }
//   console.log( "ProtectedRoute",isChoosenTable);
//   return( 
//     <Route
//     {...rest}
//     render = {(props) =>
//        auth && !isChoosenTable ? (
//       <Component onSwitchTable={switchTable}/> 
//     ) : ( auth && isChoosenTable ? <Redirect to="/table"/> 
//       : <Redirect to="/login"/>)  
//     }
//     />
//   );
// };

// const ProtectedLogin = ({auth , component : Component , ...rest}) => {
//   return(
//     <Route 
//     {...rest}
//     render = {(props) => !auth? (
//       <Component/>
//     ) : (
//       <Redirect to="/"/>
//     )}
//     />
//   );
// };

// const RouteTable = ({props , auth , isChoosenTable, component : Component ,...rest}) => {
//   console.log( "RouteTable ",isChoosenTable);
//   // return (
//   //   <Route>
//   //     { isChoosenTable && auth ? <Component/> : <Redirect/> }
//   //   </Route>
//   // );
//   return (
//     <Route 
//     {...rest}
//     render = {(props) => (auth && isChoosenTable)? (
//       <Component numTable={props.tableNumber}/>
//     ) : (
//       <Redirect to="/"/>
//     )}
//   />)
//   ;
// };



/* <UpRoutes onSwitchToTablePage={onSwitchToTablePageHandler} onChangeState={isChoosenTable}/> */
// const UpRoutes= (props) => {
//   const Auth = React.useContext(AuthApi);
//     return (
//       <div>
//         <Switch>  
//           {!props.onChangeState &&<ProtectedLogin auth={Auth.auth} path="/login" component={LoginPage} />}
//         </Switch>
//         <Switch>
//           <ProtectedRoute exect path="/"  component={RestaurantPage} auth={Auth.auth} />
//         </Switch>
//           <Route path="/table" component={TablePage}/>
//       </div>
//     )
// }


// import './App.css';
// import LoginPage from './components/login/login';
// import RestaurantPage from './components/home/home';
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
//             <PrivateRoute exact path="/home" component={RestaurantPage} />
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