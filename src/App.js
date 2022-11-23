import './App.css';
import React, { useContext, useState, useEffect }  from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Customer from './Customer';
import Login from './login';
import Register from './register';
import Admin from './Admin';
import Hotels from './Hotels';
import Protected from './protected';
import Hotel from './newHotel';
import { AuthContext, AuthProvider } from './Auth';
import Countries from './Countries';
import EditCountry from './editCountry';
import EditHotel from './editHotel';
import NewHotel from './newHotel';
import Orders from './Orders';
// import Protected from './protected';


function App() {
  return (
    <>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<Customer/>} /> */}
            <Route path='/customer' element={<Customer/>} />
            <Route path='/admin' element={<Admin/>}>
                <Route path='edithotels' default element={<Hotels/>} />
                <Route path='editcountries' element={<Countries/>} />
                <Route path='newhotel' element={<NewHotel/>} />
                <Route path='orders' element={<Orders/>} />
                <Route index element={<Countries/>} />
            </Route>
            <Route path='editcountry/:id' element={<EditCountry/>} />
            <Route path='edithotel/:id' element={<EditHotel/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/restaurant/:id' element={<Restaurant />} />
            <Route path='/editrestaurant/:id' element={<EditRestaurant />} />
            <Route path='/meal/:id' element={<Getmeal />} /> */}
            {/* <Route path='/about' element={<About />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
