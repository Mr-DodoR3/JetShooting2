const DEBUG_MODE = true;

var DISPLAY_WIDTH = 960;
var DISPLAY_HEIGHT = 640;

var selectMission = 0;
var selectAircraft = 0;
var playerData = {
  x: 0,
  y: 0
};

const config = {
  type: Phaser.CANVAS,
  perent: "gameCanvas",
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
  canvas: document.getElementById("canvas"),
  scene: [ Title, MissionSelectScene, AircraftSelectScene, TekeoffScene, ShootingScene ],
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      debug: true
    }
  }
}

var game = new Phaser.Game(config);
