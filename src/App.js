
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NavBar from "./components/Navbar"
import IsPrivate from './components/auth/IsPrivate';
import Profile from './pages/Profile'
import Home from './pages/Home'
function App() {
  return (
    <div className="App">
 <NavBar/>
      <Routes>
       

      <Route path='/auth/login' element = { <Login/> } />
      <Route path='/auth/signup' element = {<Signup/>}/>
      <Route path='/profile' element = {<IsPrivate><Profile/> </IsPrivate>}/>
      <Route path='/' element = {<Home/>}/>

        <Route path='/error' element = {<Error/> }/>
        <Route path='*' element = {<NotFound/> }/>
      </Routes>
      
    </div>
  );
}

export default App;
