var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var banda = new five.Led(52);
  var tortillera = new five.Led(50);
  var dosificador = new five.Led(48);
  var empalmadora = new five.Led(46);

  banda.on();
  tortillera.on();
  // dosificador.on();
  empalmadora.on();

});
