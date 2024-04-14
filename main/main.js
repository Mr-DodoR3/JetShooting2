const DEBUG_MODE = true;

var DISPLAY_WIDTH = 960;
var DISPLAY_HEIGHT = 640;

var bgm_vol = 10;
var se_vol = 10;

var selectMission = 0;
var selectAircraft = 16;
var playerData = {
  x: 0,
  y: 0
};

var gamePause = false;

const config = {
  // type: Phaser.CANVAS,
  type: Phaser.WEBGL,
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
