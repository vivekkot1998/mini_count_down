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

  function requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        } else {
          console.warn('Notification permission denied');
        }
      });
    }
  }
  function showNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
  // Call requestNotificationPermission when your app loads
  requestNotificationPermission();
 // Function to show notification every 2 hours
function showPeriodicNotification() {
  // Calculate the next notification time
  // const currentTime = new Date();
  //const nextNotificationTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
  
  // Show the notification
  showNotification('Reminder', {
    body: 'Check you progress',
    icon: 'public/android-chrome-512x512.png', // Optional icon path
  });
}

// Call showPeriodicNotification every 2 hours
setInterval(showPeriodicNotification, 2 * 60 * 60 * 1000);

  return (
    <div className='centered-div'>
      <div className='content'>
      <h1>Countdown</h1>
      <h3>Coding Ninjas: {daysLeft} (1st Nov 2024)</h3>
      <h3>DSA: {daysLeft - 91} (1st Aug 2024)</h3>
      <h3>Job: {daysLeft} (1st Nov 2024)</h3>
      </div>
      
    </div>
  );
};

export default Countdown;
