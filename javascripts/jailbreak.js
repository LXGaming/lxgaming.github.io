function timeStart() {
  update();
  setTimeout(function() {
    timeStart();
  }, 1000);
}

function update() {
  document.getElementById("iOSTime").innerHTML = calculateTime(Date.parse(new Date()) - Date.parse("July 19 2016 5:30:00 GMT+1200"));
  document.getElementById("JailbreakTime").innerHTML = calculateTime(Date.parse(new Date()) - Date.parse("July 24 2016 22:08:00 GMT+1200"));
}

function calculateTime(time) {
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  var days = Math.floor(time / (1000 * 60 * 60 * 24));
  return getFixedTime(days) + "d " + getFixedTime(hours) + "h " + getFixedTime(minutes) + "m " + getFixedTime(seconds) + "s ago";
}

function getFixedTime(time) {
  if (time.toString().length == 1) {
    return "0" + time;
  }
  return time;
}