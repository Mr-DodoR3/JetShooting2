class GameScene extends Phaser.Scene {
  constructor (sceneName) {
    super(sceneName);
    this.fade;
    this.nextScene = "-1";
    this.nextSceneDelta = 1;
    this.cursors;
    this.space;
  }

  init() {
    this.nextScene = "-1";
    this.nextSceneDelta = 1;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.load.image("fade_layer", "assets/images/fade_layer.png");
  }

  create() {
    this.fade = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "fade_layer");
    this.fade.alpha = this.nextSceneDelta;
  }

  update() {
    if (this.nextScene == "-1" && this.nextSceneDelta > 0) {
      this.loadScene();
    }
    else if (this.nextScene == "-1") {
      this.contller();
    }
    else {
      this.sceneChange(this.nextScene);
    }
  }

  contller() {

  }

  loadScene() {
    if (this.nextSceneDelta > 0) {
      this.fade.alpha = this.nextSceneDelta;
      this.nextSceneDelta -= 0.05;
    }
    else {
      this.fade.alpha = 0;
      this.nextSceneDelta = 0;
    }
  }

  sceneChange(next) {
    if (this.nextSceneDelta < 1.0) {
      this.fade.alpha = this.nextSceneDelta;
      this.nextSceneDelta += 0.05;
    }
    else {
      this.fade.alpha = 1;
      this.scene.start(next);
    }
  }
}