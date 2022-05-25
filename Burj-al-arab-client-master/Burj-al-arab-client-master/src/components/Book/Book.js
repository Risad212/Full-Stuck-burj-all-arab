import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import Booking from '../Book/Book'
import Bookings from '../bookings/Bookings';

const Book = () => {
  const [logInUser, setLogInUser]  = useContext(UserContext)
  const [selectedDate, setSelectedDate] = React.useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  const handleCheckInDate = (date) => {
    const newDates = {...selectedDate}
    newDates.checkIn = date
    setSelectedDate(newDates);
  };

  const handleCheckOutDate = (date) => {
    const newDates = {...selectedDate}
    newDates.checkIn = date
    setSelectedDate(newDates);
  };

  const handleBooking = () =>{
    const newBooking = {...logInUser, ...selectedDate}

    fetch('http://localhost:5000/addBooking', {
       method: 'POST',
       body: JSON.stringify(newBooking),
       headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

return (
     <div style={{textAlign: 'center'}}>
       <h3>Hello {logInUser?.name}</h3>
       <p>want to <Link to="/home">diffrent room</Link>Link</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate.checkIn}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button variant="contained" color="primary" onClick={handleBooking}>
         Book now
      </Button>
    </MuiPickersUtilsProvider>
    <Bookings />
    </div>
    );
};

export default Book;