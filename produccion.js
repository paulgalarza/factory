var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  console.log('Iniciando');

  var banda = new five.Led(24);
  var tortillera = new five.Led(22);
  var dosificador = new five.Led(26);
  var empalmadora = new five.Led(28);

  var trabajando = false;

  var sensor = new five.Sensor({
    pin: "A15",
    freq: 100
  });

  banda.on();
  tortillera.on();

  this.repl.inject({
    sensor: sensor
  });

  sensor.on("change", function() {
    console.log(this.value);
    if(this.value < 500 && !trabajando){
        trabajando = true;
        tortillera.off();
        setTimeout(function(){
          banda.off();
          dosificador.on();
          setTimeout(function(){
            dosificador.off();
            banda.on();
            setTimeout(function(){
              banda.off();
              empalmadora.on();
              setTimeout(function(){
                empalmadora.off();
                setTimeout(function(){
                  banda.on();
                  tortillera.on();
                  trabajando = false;
                }, 500);
              }, 1000);
            }, 5800);
          }, 3000);
        }, 1400);
    }

  });


});
