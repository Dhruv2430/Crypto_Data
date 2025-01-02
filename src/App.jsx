import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Button } from './components/ui/button'
import Navbar from './AllComponents/Navbar'
import Home from './AllComponents/Home';
import Coin from './AllComponents/Coin';

import Footer from './AllComponents/Footer';
import Auth from './Auth/Auth';


const App = () => {

  

  return (
    <>
    <Navbar/>
    <Home/>
    <Footer/>


    </>
  )
}

export default App