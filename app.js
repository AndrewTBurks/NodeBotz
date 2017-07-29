var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: 'f3a11e44342b428d98e8adeb6371f3f67ac559ca',
    deviceId: 'burksma'
  })
});

board.on("ready", function() {
  console.log('ready');

  let photoresistor = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value)
  });

  var rightWheel = new five.Motor({
    pins: { pwm: "D0", dir: "D4" },
    pins: { pwm: "D0", dir: "D4" },
    invertPWM: true
  });

  var leftWheel = new five.Motor({
    pins: { pwm: "D1", dir: "D5" },
    pins: { pwm: "D1", dir: "D5" },
    invertPWM: true
  });

  var speed = 128;

  function reverse() {
    leftWheel.rev(speed);
    rightWheel.rev(speed);
  }

  function forward() {
    leftWheel.fwd(speed);
    rightWheel.fwd(speed);
  }

  function stop() {
    leftWheel.stop();
    rightWheel.stop();
  }

  function left() {
    leftWheel.rev(speed);
    rightWheel.fwd(speed);
  }

  function right() {
    leftWheel.fwd(speed);
    rightWheel.rev(speed);
  }

  function exit() {
    leftWheel.rev(0);
    rightWheel.rev(0);
    setTimeout(process.exit, 1000);
  }

  var keyMap = {
    'up': forward,
    'down': reverse,
    'left': left,
    'right': right,
    'space': stop,
    'q': exit
  };

  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();

  stdin.on("keypress", function(chunk, key) {
      if (!key || !keyMap[key.name]) return;

      keyMap[key.name]();
  });
});
