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

    this.load.image("cvn-96", "assets/images/npc/cvn-96_2.png");
  }

  create() {
    super.create();

    this.cvn = this.add.image(DISPLAY_WIDTH / 2 - 69, DISPLAY_HEIGHT / 2 + 96, "cvn-96");
    this.cvn.scaleX = this.cvn.scaleX * 0.5;
    this.cvn.scaleY = this.cvn.scaleY * 0.5;

    this.player.image = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "fsb18");
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;
  }

  update() {
    super.update();
  }

  contller() {

  }
}