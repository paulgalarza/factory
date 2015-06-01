var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var banda = new five.Led(52);
  var tortillera = new five.Led(50);
  var dosificador = new five.Led(48);
  var empalmadora = new five.Led(46);

  var sensorTortillera = new five.Sensor({
    pin: 22,
    type: "digital"
  });
  var sensorDosificador = new five.Sensor({
    pin:24,
    type: 'digital'
  });

  this.repl.inject({
    sensorTortillera: sensorTortillera,
    sensorDosificador: sensorDosificador,
    banda:banda,
    tortillera:tortillera,
    dosificador:dosificador,
    empalmadora:empalmadora
  });

  var nDosificador = 0;
  var bTortillera = false;
  var bDosificador = false;
  var nDosificador = 0;
  var bDosificador = 0;

  banda.on();
  tortillera.on();


  sensorTortillera.on("change", function() {
    console.log(this.value);
    if(this.value){
      banda.off();
      tortillera.off();
      empalmadora.on();
      setTimeout(function(){
        empalmadora.off();
        banda.on();
        tortillera.on();
      }, 4000);
    }
  });

  sensorDosificador.on("change", function() {
    if(!this.value){
      nDosificador += 1;
    }
    if(!bDosificador && nDosificador > 10){
      bDosificador = true;
      banda.off();
      tortillera.off();
      dosificador.on();
      setTimeout(function(){
        banda.on();
        tortillera.on();
        dosificador.off();
        bTortillera= false;
        nDosificador = 0;
      }, 4000);
    }
  });

});
