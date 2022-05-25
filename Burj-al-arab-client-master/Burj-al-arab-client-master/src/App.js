import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import { createContext, useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

export const UserContext = createContext()

function App() {
  const [logInUser, setLogInUser] = useState()
  return (
    <UserContext.Provider value={[logInUser, setLogInUser]}>
      <h1>Log In user {logInUser?.name}</h1>
      <BrowserRouter>
        <Header />
        <Routes>
           <Route exact path='/' element={<Home />}/>
           <Route path='/home' element={<Home />}/>
           <Route path='/login' element={<Login />}/>
           <Route path='/book' element={<PrivetRoute><Book /></PrivetRoute>}/>
       </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
