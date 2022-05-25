import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../../App'

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [logInUser, setLogInUser] = useContext(UserContext)

   useEffect(() => {
    fetch('http://localhost:5000/booking?email='+logInUser.email,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         Authorization : `Bearer ${sessionStorage.getItem('token')}`
       }

      })
     .then(res => res.json())
     .then(data => setBookings(data))
   },[])



    return (
        <>
          <h2>You have {bookings.length}</h2>
          {
            bookings.map(book => <li>{book?.name} From: ${book?.checkIn} to: ${book?.checkOut}</li>)
          }
        </>
    );
};

export default Bookings;
