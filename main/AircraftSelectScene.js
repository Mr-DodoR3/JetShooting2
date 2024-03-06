class AircraftSelectScene extends GameScene {
  constructor () {
    super("aircraftSelectScene");
    this.selecter;
    this.aircraft;
    this.unittype;
    this.selectAircraft;
    this.skilIcon = new Array(SKIL_DATA.length);
    
    this.text_unitName; 
    this.text_specName;
    this.specBar = new Array(4);
    for (let i = 0; i < this.specBar.length; i++) {
      this.specBar[i] = new Array(10);
    }

    this.page = 0;
    this.unit_select_ui = new Array(UNIT_DATA.length);
  }

  init() {
    super.init();
    this.selectAircraft = 0;
  }

  preload() {
    super.preload();
    
    // this.load.image("aircraft_select_background", "assets/images/aircraft_select_select.png");
    // this.load.image("aircraft_select_ui", "assets/images/aircraft_select_ui.png");
    
    // let spec_temp = ["n", "b", "g", "r"];
    // for (let i = 0; i < spec_temp.length; i++) {
    //   this.load.image("specBar_" + i, "assets/images/specBar_" + spec_temp[i] +".png");
    // }
    
    // for (let i = 0; i < UNIT_DATA.length; i++) {
    //   this.load.image(UNIT_DATA[i].tag, "assets/images/player/" + UNIT_DATA[i].tag +".png");
    // }
  }

  create() {
    this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "aircraft_select_background");
    this.selecter = this.add.image(96+128, 154+(this.selectAircraft * 32), "select_ui_selecter");
    // this.add.image(96+128, 184+82, "aircraft_select_ui");
    for (let i = 0; i < UNIT_DATA.length; i++) {
      this.unit_select_ui[i] = this.add.image(96+128, 154 + i * 32, "unitSelect_" + UNIT_DATA[i].tag);
      if (i > 12) { 
        this.unit_select_ui[i].setVisible(false);
      }
    }
    this.aircraft = this.add.image(800, 286, "fsb18");
    this.unittype = this.add.image(539, 151, "unittype_multirole");
    
    for (let i = 0; i < SKIL_DATA.length; i++) {
      this.skilIcon[i] = this.add.image(458 + (i > 11 ? i - 12 : i) * 36, 380 + (i > 11 ? 36 : 0), SKIL_DATA[i].tag);
    }

    this.text_unitName = this.add.text(440, 172, '', { font: '36px monospace', fill: '#00ff00' });
    this.text_specName = this.add.text(440, 224, '', { font: '24px monospace', fill: '#00ff00' });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        this.specBar[i][j] = this.add.image(496 + j * 16, 236 + i * 50, j < 3 ? "specBar_1" : (j < 7 ? "specBar_2" : "specBar_3"));
        this.specBar[i][j].scaleX = this.specBar[i][j].scaleX * 0.5;
        this.specBar[i][j].scaleY = this.specBar[i][j].scaleY * 0.5;
      }
    }
    
    this.updateData();
    super.create();
  }

  update() {
    // this.selecter.setPosition(224, 154 + ((this.selectAircraft - this.page) * 32));
    // this.writeText();
    // this.aircraft.setTexture(UNIT_DATA[this.selectAircraft].tag);
    // this.unittype.setTexture("unittype_" + UNIT_DATA[this.selectAircraft].type);
    super.update();
  }

  updateData() {
    this.writeText();
    this.aircraft.setTexture(UNIT_DATA[this.selectAircraft].tag);
    this.unittype.setTexture("unittype_" + UNIT_DATA[this.selectAircraft].type);
    for (let i = 0; i < this.skilIcon.length; i++) {
      this.skilIcon[i].setAlpha(0.6);
      for (let j = 0; j < UNIT_DATA[this.selectAircraft].skil.length; j++) {
        if (UNIT_DATA[this.selectAircraft].skil[j] == SKIL_DATA[i].tag) {
          this.skilIcon[i].setAlpha(1.0);
          break;
        }
      }
    }
    
    for (let i = 0; i < UNIT_DATA.length; i++) {
      this.unit_select_ui[i].setPosition(96+128, 154 + (i - this.page) * 32);
      if (i - this.page < 0 || i - this.page > 12) {
        this.unit_select_ui[i].setVisible(false);
      }
      else {
        this.unit_select_ui[i].setVisible(true);
      }
    }
    this.selecter.setPosition(224, 154 + ((this.selectAircraft - this.page) * 32));
  }
  
  writeText() {
    this.text_unitName.setText(UNIT_DATA[this.selectAircraft].serial + " " + UNIT_DATA[this.selectAircraft].name);
    this.text_specName.setText("SPD\n\nDEF\n\nCHG");
    // let spec_count = 0;
    for (let i = 0; i < 3; i++) {
      // spec_count += UNIT_DATA[this.selectAircraft].spec[i];
      for (let j = 0; j < 10; j++) {
        this.specBar[i][j].setTexture(UNIT_DATA[this.selectAircraft].spec[i] <= j ? "specBar_0" : (j < 3 ? "specBar_1" : (j < 7 ? "specBar_2" : "specBar_3")))
      }
    }
    // console.log(UNIT_DATA[this.selectAircraft].name + ":" + spec_count);
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.selectAircraft--;
      if (this.selectAircraft < 0) {
        if (UNIT_DATA.length < 14) {
          this.selectAircraft = UNIT_DATA.length - 1;
        }
        else {
          this.page = UNIT_DATA.length - 13;
          this.selectAircraft = UNIT_DATA.length - 1;
        }
      }
      else if (this.selectAircraft - this.page == 0 && this.selectAircraft + (this.page - 1) > 0) {
        this.page--;
      }
      this.updateData();
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.selectAircraft++;
      if (this.selectAircraft > UNIT_DATA.length - 1) {
        this.page = 0;
        this.selectAircraft = 0;
      }
      else if (this.selectAircraft - this.page == 12 && this.selectAircraft + (this.page + 1) <= UNIT_DATA.length) {
        this.page++;
      }
      this.updateData();
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.nextScene = this.selectAircraft;
      selectAircraft = this.selectAircraft;
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