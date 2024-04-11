class MissionSelectScene extends GameScene {
  constructor () {
    super("missionSelectScene");
    this.selecter;
  }

  init() {
    super.init();
    selectMission = 0;
  }

  preload() {
    super.preload();

    // this.load.image("mission_select_background", "assets/images/mission_select.png");
    // this.load.image("select_ui", "assets/images/mission_select_ui.png");
    // this.load.image("select_ui_selecter", "assets/images/ui_selecter.png");
  }

  create() {
    this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "mission_select_background");
    this.selecter = this.add.image(96+128, 154+(selectMission * 32), "select_ui_selecter");
    this.add.image(96+128, 120+82, "select_ui");
    super.create();
  }

  update() {
    this.selecter.setPosition(224, 154 + (selectMission * 32));
    super.update();
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      selectMission--;
      if (selectMission < 0) selectMission = 3;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      selectMission++;
      if (selectMission > 3) selectMission = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.nextScene = selectMission;
      // switch (selectMission) {
      //   case 0:
      //     break;
      //   case 1:
      //     break;
      //   case 2:
      //     break;
      //   case 3:
      //     break;
      //   case 4:
      //     break;
      //   default:
      //     break;
      // }
    }
    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.nextScene = "title";
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
      next = this.nextScene == "title" ? "title" : "aircraftSelectScene";
      this.scene.start(next);
    }
  }
}