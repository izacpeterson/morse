/** @format */
var socket = io();

let string = "";
let dashBtn = document.getElementById("dash");
let dotBtn = document.getElementById("dot");
let spaceBtn = document.getElementById("space");

let spaceCount = 0;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // true for mobile device
  dashBtn.addEventListener("touchstart", () => {
    socket.emit("chat message", "-");
    spaceCount = 0;
  });
  dotBtn.addEventListener("touchstart", () => {
    socket.emit("chat message", ".");
  });
  spaceBtn.addEventListener("touchstart", () => {
    socket.emit("chat message", "	&#160; &#160;");
    spaceCount++;
    if (spaceCount > 4) {
      socket.emit("clear", "clear");
    }
  });
} else {
  // false for not mobile device
  dashBtn.addEventListener("click", () => {
    socket.emit("chat message", "-");
  });
  dotBtn.addEventListener("click", () => {
    socket.emit("chat message", ".");
  });
  spaceBtn.addEventListener("click", () => {
    socket.emit("chat message", "	&#160; &#160;");
    spaceCount++;
    if (spaceCount > 4) {
      socket.emit("clear", "clear");
    }
  });
}

socket.on("chat message", (msg) => {
  string += msg;
  console.log("msg rec");
  console.log(string);
  document.querySelector("#msg").innerHTML += msg;

  if (msg === "-") {
    navigator.vibrate(100);
  } else if (msg === ".") {
    navigator.vibrate(50);
  }
});
socket.on("clear", (msg) => {
  document.querySelector("#msg").innerHTML = "";
});
