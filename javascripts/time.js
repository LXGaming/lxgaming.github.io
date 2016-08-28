function timeStart() {
  update();
  setTimeout(function() {
    timeStart();
  }, 1000);
}

function update() {
  var time = new Date();
  document.getElementById("time").innerHTML = ""
    + getFixedTime(time.getHours()) + ":" + getFixedTime(time.getMinutes()) + ":" + getFixedTime(time.getSeconds()) + "<br>"
    + getDayName(time.getDay()) + " " + time.getDate() + " " + getMonthName(time.getMonth()) + " " + time.getFullYear();
}

function getFixedTime(time) {
  if (time.toString().length == 1) {
    return "0" + time;
  }
  return time;
}

function getDayName(day) {
  if (day == 0) {
    return "Sunday";
  } else if (day == 1) {
    return "Monday";
  } else if (day == 2) {
    return "Tuesday";
  } else if (day == 3) {
    return "Wednesday";
  } else if (day == 4) {
    return "Thursday";
  } else if (day == 5) {
    return "Friday";
  } else if (day == 6) {
    return "Saturday";
  }
  return "Error";
}

function getMonthName(month) {
  if (month == 0) {
    return "January";
  } else if (month == 1) {
    return "February";
  } else if (month == 2) {
    return "March";
  } else if (month == 3) {
    return "April";
  } else if (month == 4) {
    return "May";
  } else if (month == 5) {
    return "June";
  } else if (month == 6) {
    return "July";
  } else if (month == 7) {
    return "August";
  } else if (month == 8) {
    return "September";
  } else if (month == 9) {
    return "October";
  } else if (month == 10) {
    return "November";
  } else if (month == 11) {
    return "December";
  }
  return "Error";
}