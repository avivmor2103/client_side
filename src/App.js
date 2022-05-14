import './App.css';
import Login from './components/login/login';
import Home from './components/home/home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route exect path='/' element={ <Home/>}></Route>
            <Route exect path='/login' element={ <Login/>}></Route>
          </Routes>
      </div>
    </Router>
   
  )}

export default App;
