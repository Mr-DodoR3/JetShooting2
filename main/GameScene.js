class GameScene extends Phaser.Scene {
  constructor (sceneName) {
    super(sceneName);
    this.fade;
    this.nextScene = "-1";
    this.cursors;
    this.space;
    this.key;

    this.option;
    this.window = "null";
  }

  init() {
    this.nextScene = "-1";
    this.nextSceneDelta = 1;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.key = {
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      x: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      c: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
      p: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    };
  }

  create() {
    this.window = "null";

    this.fade = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "fade_layer");
    this.fade.depth = 999;
    this.fade.alpha = 1;
    
    if (DEBUG_MODE) {
      this.input.on("pointerdown", function(pointer) {
        console.log(pointer.x + "," + pointer.y)
      }, this);
    }

    this.option = new Option(this);
  }

  update() {
    if (this.nextScene == "-1" && this.nextSceneDelta > 0) {
      this.loadScene();
    }
    else if (this.nextScene == "-1") {
      if (this.window == "option") {
        this.option_contller();
        const data = this.option.update();
        if (data == "close") {
          this.back_thisScene();
        }
      }
      else {
        this.contller();
      }
    }
    else {
      this.sceneChange(this.nextScene);
      if (this.window == "option") this.option.update();
    }
  }

  back_thisScene() {
    this.window = "none";
  }

  option_contller() {
    if (this.option.status == "disp") {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.option.selectOption--;
        if (this.option.selectOption < 0) this.option.selectOption = 2;
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        if (this.option.selectOption == 0 && bgm_vol > 0) bgm_vol--;
        if (this.option.selectOption == 1 && se_vol > 0) se_vol--;
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        this.option.selectOption++;
        if (this.option.selectOption > 2) this.option.selectOption = 0;
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        if (this.option.selectOption == 0 && bgm_vol < 10) bgm_vol++;
        if (this.option.selectOption == 1 && se_vol < 10) se_vol++;
      }
      if (Phaser.Input.Keyboard.JustDown(this.space)) {
        if (this.option.selectOption == 2) {
          this.option.status = "close";
        }
      }
      this.option.renew();
    }
  }

  contller() {

  }

  loadScene() {
    if (this.nextSceneDelta > 0) {
      this.fade.alpha = this.nextSceneDelta;
      this.nextSceneDelta -= 0.05;

      if (this.nextSceneDelta <= 0){
        this.fade.alpha = 0;
        this.nextSceneDelta = 0;
      }
    }
  }

  sceneChange(next) {
    if (next == "option") {
      if (this.nextSceneDelta < 1.0) {
        this.nextSceneDelta += 0.05;
      }
      else {
        this.nextSceneDelta = 0;
        this.nextScene = -1;
      }
    }
    else {
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
}
