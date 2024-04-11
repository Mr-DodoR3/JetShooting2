class AircraftSelectScene extends GameScene {
  textBox = new class {
    constructor() {
      this.container;
      this.graphics;
      this.box;
      this.txtLen = 0;
      this.txtPos = 0;
      this.txtTime = 0;
    };

    setup(scene) {
      this.graphics = scene.add.graphics({ fillStyle: { color: 0x00004f }, lineStyle: { width: 2, color: 0xffffff } });
      this.box = new Phaser.Geom.Rectangle(100, 570, 760, 40);

      const maskBox = scene.add.rectangle(480, 590, 760, 40, 0x000000).setVisible(false);
      this.mask = maskBox.createGeometryMask();

      this.text = scene.add.text(108, 578, '機体を選択してください。', { font: '24px monospace', fill: '#ffffff' });
    }

    update() {
      this.graphics.clear();
      this.graphics.fillStyle(0x00004f);
      this.graphics.fillRectShape(this.box);
      // this.graphics.setStroke("#0000FF", 2);
      this.graphics.strokeRectShape(this.box);

      if (this.txtLen > 31) {
        if (this.txtTime > 30) {
          this.text.setX(108 - this.txtPos);
          this.txtPos++;
          if (this.txtPos > this.txtLen * 24) {
            this.resetPos();
          }
        }
        else {
          this.txtTime++;
        }
      }

      this.text.setMask(this.mask);
    }

    resetPos() {
      this.txtPos = 0;
      this.txtTime = 0;
      this.text.setX(108);
    }

    setText(txt) {
      this.resetPos();
      this.text.setText(txt);
      this.txtLen = txt.length;
      // console.log(this.text.text);
    }
  }();

  constructor () {
    super("aircraftSelectScene");
    this.selecter;
    this.aircraft;
    this.unittype;
    this.selectAircraft;
    this.selectEx = "none";
    this.skilIcon = new Array(SKIL_DATA.length);
    this.weaponIcon = new Array(2);
    
    this.text_unitName; 
    this.text_specName;
    this.specBar = new Array(4);

    this.long_push = 0;
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

  resetSelect() {
    this.page = 0;
    this.selectAircraft = 0;
  }

  create() {
    this.resetSelect();

    this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "aircraft_select_background");
    this.selecter = this.add.image(96+128, 154+(this.selectAircraft * 32), "select_ui_selecter");
    // this.add.image(96+128, 184+82, "aircraft_select_ui");

    this.textBox.setup(this);

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
    this.weaponIcon[0] = this.add.image(548, 486, "weapon_" + UNIT_DATA[this.selectAircraft].weapon);
    this.weaponIcon[1] = this.add.image(762, 486, "weapon_" + UNIT_DATA[this.selectAircraft].specail_weapon);

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
    this.pointerCheck();
    this.textBox.update();
    super.update();
  }

  pointerCheck() {
    const pointer = this.input.activePointer;
    
    let txt = "null";
    if (pointer.x > 440 && pointer.x < 646 && pointer.y > 224 && pointer.y < 248) {
      txt = "機体の速度です。この値が高いと機動性が上がります。";
      this.selectEx = txt;
    }
    else if (pointer.x > 440 && pointer.x < 646 && pointer.y > 274 && pointer.y < 298) {
      txt = "機体の耐久性です。この値が高いと防御力が上がります。";
      this.selectEx = txt;
    }
    else if (pointer.x > 440 && pointer.x < 646 && pointer.y > 324 && pointer.y < 348) {
      txt = "機体の発電力です。この値が高いとチャージ速度が上がります。";
      this.selectEx = txt;
    }
    else if (pointer.x > 412 && pointer.x < 640 && pointer.y > 140 && pointer.y < 160) {
      if (UNIT_DATA[this.selectAircraft].type == "multirole") txt = "マルチロール機:航空目標・地上目標に対して少し威力の補正が付きます。";
      if (UNIT_DATA[this.selectAircraft].type == "fighter") txt = "戦闘機:航空目標に対して威力の補正が付きます。";
      if (UNIT_DATA[this.selectAircraft].type == "attacker") txt = "攻撃機:地上目標（海上目標除く）に対して威力の補正が付きます。";
      if (UNIT_DATA[this.selectAircraft].type == "interceptor") txt = "迎撃機:時限強化時に威力の補正が付きます。";
      if (UNIT_DATA[this.selectAircraft].type == "bomber") txt = "爆撃機:ボスに対して威力の補正が付きます。";
      if (UNIT_DATA[this.selectAircraft].type == "trainer") txt = "練習機:威力の補正はありません。";
      // const txt = UNIT_DATA[this.selectAircraft].type == "fighter" ? "戦闘機:対空目標に対して威力の補正が付きます。";
      this.selectEx = txt;
    }
    else {
      for (let i = 0; i < SKIL_DATA.length; i++) {
        if (pointer.x > (442 + (i > 11 ? i - 12 : i) * 36) && pointer.x < (474 + (i > 11 ? i - 12 : i) * 36) && pointer.y > (364 + (i > 11 ? 36 : 0)) && pointer.y < (396 + (i > 11 ? 36 : 0))) {
          txt = SKIL_DATA[i].name_jp + ":" + SKIL_DATA[i].explanation;
          this.selectEx = txt;
        }
      }
    }

    if (txt == "null" && !(this.selectEx == "none")) {
      this.selectEx = "none";
      this.textBox.setText(UNIT_DATA[this.selectAircraft].explanation);
    }
    else if (!(this.selectEx == "none") && !(this.selectEx == this.textBox.text.text)) {
      this.textBox.setText(txt);
    }
  }

  updateData() {
    this.writeText();
    this.aircraft.setTexture(UNIT_DATA[this.selectAircraft].tag);
    this.unittype.setTexture("unittype_" + UNIT_DATA[this.selectAircraft].type);
    this.weaponIcon[0].setTexture("weapon_" + UNIT_DATA[this.selectAircraft].weapon);
    this.weaponIcon[1].setTexture("weapon_" + UNIT_DATA[this.selectAircraft].specail_weapon);
    // this.textBox.update();
    if (this.selectEx == "none") {
      this.textBox.setText(UNIT_DATA[this.selectAircraft].explanation);
    }
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
      console.log(UNIT_DATA.length)
      this.selectAircraft++;
      if (this.selectAircraft > UNIT_DATA.length - 1) {
        this.page = 0;
        this.selectAircraft = 0;
      }
      else if (this.selectAircraft - this.page == 12 && this.selectAircraft + 1 < UNIT_DATA.length) {
        this.page++;
      }
      this.updateData();
    }
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.nextScene = this.selectAircraft;
      selectAircraft = this.selectAircraft;
    }
    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.nextScene = "missionSelectScene";
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
      next = this.nextScene == "missionSelectScene" ? "missionSelectScene" : "tekeoffScene";
      this.scene.start(next);
    }
  }
}
