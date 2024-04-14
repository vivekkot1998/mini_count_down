import { useState, useEffect } from 'react';
import './App.css'

const Countdown = () => {
  // State for the number of days left
  const [daysLeft, setDaysLeft] = useState(0);

  // Function to calculate the number of days left
  const calculateDaysLeft = () => {
    // Get the current date
    const currentDate = new Date();

    // Define the end date (31 October 2024)
    const endDate = new Date('2024-10-31');

    // Calculate the difference in milliseconds
    const differenceMs = endDate - currentDate;

    // Convert milliseconds to days and update the state
    setDaysLeft(Math.ceil(differenceMs / (1000 * 60 * 60 * 24)));
  };

  // Update the number of days left when the component mounts
  useEffect(() => {
    calculateDaysLeft();

    // Set up interval to recalculate days left every day
    const intervalId = setInterval(() => {
      calculateDaysLeft();
    }, 86400000); // 24 hours in milliseconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='centered-div'>
      <div className='content'>
      <h1>Countdown</h1>
      <h3>Days left: {daysLeft}</h3>
      </div>
      
    </div>
  );
};

export default Countdown;
