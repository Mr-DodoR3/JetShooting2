const DEBUG_MODE = true;

var DISPLAY_WIDTH = 960;
var DISPLAY_HEIGHT = 640;

var selectMission = 0;
var selectAircraft = 0;
var playerData;

const config = {
  type: Phaser.AUTO,
  width: DISPLAY_WIDTH,
  height: DISPLAY_HEIGHT,
  scene: [ Title, MissionSelectScene, AircraftSelectScene, TekeoffScene, ShootingScene ],
  physics: {
    default: "arcade"
  }
}

var game = new Phaser.Game(config);
