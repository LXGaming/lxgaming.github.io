function timeStart() {
  update();
  setTimeout(function() {
    update();
  }, 1000);
}

function update() {
  var time = new Date();
  document.getElementById("content").innerHTML = ""
    + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() + "<br>"
    + time.getUTCDate() + "/" + (time.getUTCMonth() + 1) + "/" + time.getUTCFullYear();
}