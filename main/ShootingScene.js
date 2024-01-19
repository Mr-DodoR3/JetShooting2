class ShootingScene extends GameScene {
  constructor () {
    super("shootingScene");

    this.player = {
      image : null,
      pos : { x: DISPLAY_WIDTH / 2, y: DISPLAY_HEIGHT / 2 + 200 }
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

    this.player.image = this.add.image(this.player.pos.x, this.player.pos.y, UNIT_DATA[selectAircraft].tag);
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;
  }

  update() {
    this.player.image.setX(this.player.pos.x);
    this.player.image.setY(this.player.pos.y);
    super.update();
  }

  contller() {
    if (this.cursors.up.isDown) {
      this.player.pos.y -= 5;
    }
    if (this.cursors.down.isDown) {
      this.player.pos.y += 5;
    }
    if (this.cursors.right.isDown) {
      this.player.pos.x += 5;
    }
    if (this.cursors.left.isDown) {
      this.player.pos.x -= 5;
    }
    if (this.space.isDown) {
      
    }
  }
}