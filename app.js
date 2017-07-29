var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: 'f3a11e44342b428d98e8adeb6371f3f67ac559ca',
    deviceId: 'burksma'
  })
});

board.on("ready", function() {
  console.log("Device Ready..");
  var led = new five.Led("D7");
  led.blink();
});
