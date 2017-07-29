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
  var led = new five.Led("D0");
  var bLed = new five.Led("D7");
  bLed.blink();

  // let photoresistor = new five.Sensor({
  //   pin: "A0",
  //   freq: 250
  // });
  //
  // // "data" get the current reading from the photoresistor
  // photoresistor.on("data", function() {
  //   if (this.value > 900) {
  //     led.on();
  //   } else {
  //     led.off();
  //   }
  // });

  let button = new five.Button("D4");

  // "down" the button is pressed
  button.on("down", function() {
    // led.on();
    led.toggle();
    // console.log("down");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    // console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    // led.off();
    // console.log("up");

  });
});
