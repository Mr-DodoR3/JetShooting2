class ShootingScene extends GameScene {
  constructor () {
    super("shootingScene");

    this.player = {
      image : null
    };
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.player.image = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 200, UNIT_DATA[selectAircraft].tag);
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;
  }

  update() {
    super.update();
  }

  contller() {

  }
}