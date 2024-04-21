class MissionSelectScene extends GameScene {
  textBox = new class {
    constructor() {
      this.container;
      this.graphics;
      this.box;
      this.titleLen = 0;
      this.titlePos = 0;
      this.titleTime = 0;

      this.overviewLen = 0;
      this.overviewPos = 0;
    };

    setup(scene) {
      const maskBox_title = scene.add.rectangle(655, 461, 478, 40, 0x000000).setVisible(false);
      this.mask_title = maskBox_title.createGeometryMask();

      const maskBox_overview = scene.add.rectangle(655, 536, 478, 105, 0x000000).setVisible(false);
      this.mask_overview = maskBox_overview.createGeometryMask();

      this.text_title = scene.add.text(423, 448, 'ステージを選択してください。', { font: '24px monospace', fill: '#ffffff' });
      this.text_overview = scene.add.text(423, 488, 'ステージの詳細。', { font: '15px monospace', fill: '#ffffff' });
    }

    update() {
      if (this.titleLen > 19) {
        if (this.titleTime > 30) {
          this.text_title.setX(423 - this.titlePos);
          this.titlePos++;
          if (this.titlePos > this.titleLen * 24) {
            this.resetPos();
          }
        }
        else {
          this.titleTime++;
        }
      }

      this.text_title.setMask(this.mask_title);
      this.text_overview.setMask(this.mask_overview);
    }

    resetPos() {
      this.titlePos = 0;
      this.titleTime = 0;
      this.text_title.setX(423);
    }

    setText(title, overview) {
      this.resetPos();
      
      this.text_title.setText(title);
      this.titleLen = title.length;
      this.text_overview.setText(overview);
      this.overviewLen = overview.length;
    }

    moveOverview(y) {
      if (this.text_overview.height > 105) {
        this.overviewPos += y;
        const dif = this.text_overview.height - 105 + 8;
        if (this.overviewPos + dif < 0) {
          console.log("OK")
          this.overviewPos = -dif;
        }
        if (this.overviewPos > 0) {
          console.log("OK")
          this.overviewPos = 0;
        }
        this.text_overview.setY(488 + this.overviewPos);
      }
    }
  }();

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
    const maskDisplay = this.add.rectangle(655, 276, 478, 272, 0x000000).setVisible(false);
    this.mask_display = maskDisplay.createGeometryMask();
    this.selecter = this.add.image(96+128, 154+(selectMission * 32), "select_ui_selecter");
    this.add.image(96+128, 120+82, "select_ui");

    this.pin = this.add.image(740, 256 - 20, "pin").setDepth(50);
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
    this.ellipse = new Phaser.Geom.Ellipse(740, 256, 0, 0);
    this.ellipse_size = 0;
    this.ellipse_count = 0;

    this.textBox.setup(this);
    this.textBox.setText(MISSION_DATA[selectMission][0].title, MISSION_DATA[selectMission][0].overview);

    this.input_mouseWheel();

    super.create();
  }

  input_mouseWheel() {
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) =>
    {
      if (pointer.x > 416 && pointer.x < 894 && pointer.y > 484 && pointer.y < 588) {
        if (deltaY > 0) {
          this.textBox.moveOverview(-2);
        }
        else {
          this.textBox.moveOverview(2);
        }
      }
    });
  }

  setPin() {
    this.pin.setX(MISSION_DATA[selectMission][0].pos[0]);
    this.pin.setY(MISSION_DATA[selectMission][0].pos[1] - 20);
    this.ellipse.x = MISSION_DATA[selectMission][0].pos[0];
    this.ellipse.y = MISSION_DATA[selectMission][0].pos[1];

    this.graphics.clear();
    this.ellipse_size++;
    this.graphics.setAlpha(1.0 - (this.ellipse_size / 100));
    this.ellipse.width = this.ellipse_size * 1;
    this.ellipse.height = this.ellipse_size * 0.5;
    if (this.ellipse_size > 100) {
      this.ellipse_size = 0;
    }

    this.graphics.setMask(this.mask_display);
    this.graphics.strokeEllipseShape(this.ellipse);
  }

  update() {
    this.selecter.setPosition(224, 154 + (selectMission * 32));
    this.textBox.update();

    this.setPin();
    
    super.update();
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      selectMission--;
      if (selectMission < 0) selectMission = 3;
      this.textBox.setText(MISSION_DATA[selectMission][0].title, MISSION_DATA[selectMission][0].overview);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      selectMission++;
      if (selectMission > 3) selectMission = 0;
      this.textBox.setText(MISSION_DATA[selectMission][0].title, MISSION_DATA[selectMission][0].overview);
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.nextScene = selectMission;
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
