var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var empanadas = 3;
  var lcd = new five.LCD({ pins: [ 12,11,5,4,3,2 ] });
  var high = 0x01;
  var low  = 0x00;

  var banda = new five.Pin(22);
  var tortillera = new five.Pin(24);
  var dosificador = new five.Pin(26);
  var molde = new five.Pin(28);

  banda.write(high);
  tortillera.write(high);

  function iniciar(){
    printNumber();
    lcd.setCursor(0,1);
    lcd.print("Avanzando");
    banda.write(high);
    tortillera.write(high);
    console.log("Iniciando");
    console.log("Avanza banda");
    console.log("Avanza tortillera");
  }

  function relleno(){
    printNumber();
    lcd.setCursor(0,1);
    lcd.print("Sensor Relleno");
    board.wait(1000,function(){
      printNumber();
      lcd.setCursor(0,1);
      lcd.print("Rellenando");
      console.log("apagando banda");
      console.log("apagando tortillera");
      banda.write(low);
      tortillera.write(low);
      dosificador.write(high);
      console.log("enciende dosificador");
    });
    board.wait(4000,function(){
      printNumber();
      lcd.setCursor(0,1);
      lcd.print("Avanzando");
      console.log("enciende dosificador");
      dosificador.write(low);
      console.log("enciende banda y tortillera");
      banda.write(high);
      tortillera.write(high);
    });
  }

  function moldear(){
    printNumber();
    lcd.setCursor(0,1);
    lcd.print("Sensor molde");
    board.wait(1000,function(){
      printNumber();
      lcd.setCursor(0,1);
      lcd.print("Moldeando");
      console.log("apagando banda y tortillera");
      banda.write(low);
      tortillera.write(low);
      console.log("enciente el molde");
      molde.write(high);
    });
    board.wait(4000,function(){
      printNumber();
      lcd.setCursor(0,1);
      lcd.print("Avanzando");
      console.log("apaga molde");
      console.log("enciente banda y tortillera");
      molde.write(low);
      banda.write(high);
      tortillera.write(high);
    });
  }

  function maquina(){
    printNumber();
    iniciar();
    board.wait(2000,function(){
      relleno();
    });
    board.wait(8000,function(){
      moldear();
    });
    empanadas--;
  }

  function printNumber(){
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Faltantes: "+empanadas);
  }

  board.loop(12000, maquina);
  /*var led = new five.Led(13);
  led.blink();*/
  //
});
