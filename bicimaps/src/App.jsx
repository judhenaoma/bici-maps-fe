
import './App.css';
import { Map } from './components/Map/Map';
import { Login } from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { SignUp } from './components/SignUp/SignUp';
import { useState } from 'react';
import { Home } from './components/Home/Home';
import { Redirect } from './components/utils/Redirect';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Redirect to='/home'/>}/>
        <Route path='/home' element={<Home loggedIn={ loggedIn } />}/>
        <Route path='/map' element={<Map loggedIn={ loggedIn } />}/>
        <Route path='/login' element={<Login setLoggedIn = { setLoggedIn } />}/>
        <Route path='/signup' element={ <SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
