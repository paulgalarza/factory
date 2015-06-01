var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var high = 0x01;
  var low  = 0x00;

  var banda = new five.Pin(22);
  var tortillera = new five.Pin(24);
  var dosificador = new five.Pin(26);
  var molde = new five.Pin(28);

  var lcd = new five.LCD({ pins: [ 12,11,5,4,3,2 ] });
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("It´s working");

});
