var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensorTortillera = new five.Sensor({
    pin: 22,
    type: "digital"
  });

  sensorTortillera.on("change", function() {
    console.log(this.value);
  });

});
