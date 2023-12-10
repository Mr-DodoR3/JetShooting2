class Title extends GameScene {
  constructor () {
    super("title");
    this.mode = 0;
    this.selecter;
  }

  init() {
    super.init();
    this.mode = 0;
  }

  preload() {
    super.preload();

    this.load.image("title_ui_selecter", "assets/images/title_ui_selecter.png");
    this.load.image("title", "assets/images/title.png");
    this.load.image("title_ui", "assets/images/title_ui.png");
    this.load.image("fade_layer", "assets/images/fade_layer.png");
  }

  create() {
    this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "title");
    this.selecter = this.add.image(96+128, 420+18+(this.mode * 32), "title_ui_selecter");
    this.add.image(96+128, 420+82, "title_ui");
    super.create();
  }

  update() {
    this.selecter.setPosition(224, 438 + (this.mode * 32));
    super.update();
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.mode--;
      if (this.mode < 0) this.mode = 4;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.mode++;
      if (this.mode > 4) this.mode = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      switch (this.mode) {
        case 0:
          this.nextScene = "missionSelectScene"
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    }
  }

  sceneChange(next) {
    if (this.nextSceneDelta < 1.0) {
      this.selecter.scaleX = this.selecter.scaleX * 0.8;
      this.fade.alpha = this.nextSceneDelta;
      this.nextSceneDelta += 0.05;
    }
    else {
      this.selecter.scaleX = 0;
      this.fade.alpha = 1;
      console.log(next)
      this.scene.start(next);
    }
  }
}