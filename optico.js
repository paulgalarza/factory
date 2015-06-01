var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensor = new five.Sensor({
    pin: 22,
    type: "digital"
  });
  var led = new five.Led(46);

  this.repl.inject({
    sensor:sensor,
    led:led
  });

  sensor.on("change", function() {
    console.log(this.value);
    if(this.value)
      led.on();
    else {
      led.off();
    }
  });

});
