class AircraftSelectScene extends GameScene {
  constructor () {
    super("aircraftSelectScene");
    this.selecter;
    this.aircraft;
    this.selectAircraft;
    
    this.text_unitName; 
    this.text_specName;
    this.specBar = new Array(4);
    for (let i = 0; i < this.specBar.length; i++) {
      this.specBar[i] = new Array(10);
    }
  }

  init() {
    super.init();
    this.selectAircraft = 0;
  }

  preload() {
    super.preload();

    this.load.image("aircraft_select_background", "assets/images/aircraft_select_select.png");
    this.load.image("aircraft_select_ui", "assets/images/aircraft_select_ui.png");
    
    let spec_temp = ["n", "b", "g", "r"];
    for (let i = 0; i < spec_temp.length; i++) {
      this.load.image("specBar_" + i, "assets/images/specBar_" + spec_temp[i] +".png");
    }
    
    for (let i = 0; i < UNIT_DATA.length; i++) {
      this.load.image(UNIT_DATA[i].tag, "assets/images/player/" + UNIT_DATA[i].tag +".png");
    }
  }

  create() {
    this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "aircraft_select_background");
    this.selecter = this.add.image(96+128, 154+(this.selectAircraft * 32), "select_ui_selecter");
    this.add.image(96+128, 184+82, "aircraft_select_ui");
    this.aircraft = this.add.image(800, 286, "fsb18");

    this.text_unitName = this.add.text(440, 156, '', { font: '36px monospace', fill: '#00ff00' });
    this.text_specName = this.add.text(440, 224, '', { font: '24px monospace', fill: '#00ff00' });

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        this.specBar[i][j] = this.add.image(496 + j * 16, 236 + i * 50, j < 3 ? "specBar_1" : (j < 7 ? "specBar_2" : "specBar_3"));
        this.specBar[i][j].scaleX = this.specBar[i][j].scaleX * 0.5;
        this.specBar[i][j].scaleY = this.specBar[i][j].scaleY * 0.5;
      }
    }

    super.create();
  }

  update() {
    this.selecter.setPosition(224, 154 + (this.selectAircraft * 32));
    this.writeText();
    this.aircraft.setTexture(UNIT_DATA[this.selectAircraft].tag);
    super.update();
  }

  writeText() {
    this.text_unitName.setText(UNIT_DATA[this.selectAircraft].serial + " " + UNIT_DATA[this.selectAircraft].name);
    this.text_specName.setText("SPD\n\nDEF\n\nCHG\n\nSTL");
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        this.specBar[i][j].setTexture(UNIT_DATA[this.selectAircraft].spec[i] <= j ? "specBar_0" : (j < 3 ? "specBar_1" : (j < 7 ? "specBar_2" : "specBar_3")))
      }
    }
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.selectAircraft--;
      if (this.selectAircraft < 0) this.selectAircraft = 7;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.selectAircraft++;
      if (this.selectAircraft > 7) this.selectAircraft = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.nextScene = this.selectAircraft;
      selectAircraft = this.selectAircraft;
      // switch (this.selectAircraft) {
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
      next = "tekeoffScene";
      this.scene.start(next);
    }
  }
}