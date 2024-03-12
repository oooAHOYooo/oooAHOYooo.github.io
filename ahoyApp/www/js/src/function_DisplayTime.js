function displayESTDateTime() {
    const estOffset = -5; // EST is UTC-5
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const estTime = new Date(utc + (3600000 * estOffset));
  
    let hours = estTime.getHours();
    let minutes = estTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ampm;
  
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[estTime.getDay()];
    const month = months[estTime.getMonth()];
    const date = estTime.getDate();
    const strDate = `${day} ${month} ${date}`;
  
    // Update the element with id="calendar-date" to display the time
    document.getElementById("calendar-time").innerHTML = strTime;
    // Use a new element with id="calendar-date" to display the date
    document.getElementById("calendar-date").innerHTML = strDate;
  }
  
  // Ensure the DOM is fully loaded before calling the function
  document.addEventListener('DOMContentLoaded', displayESTDateTime);