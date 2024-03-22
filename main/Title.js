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

    // Title
    this.load.image("title_ui_selecter", "assets/images/title_ui_selecter.png");
    this.load.image("title", "assets/images/title.png");
    this.load.image("title_ui", "assets/images/title_ui.png");
    this.load.image("fade_layer", "assets/images/fade_layer.png");
    
    // MissionSelect
    this.load.image("mission_select_background", "assets/images/mission_select.png");
    this.load.image("select_ui", "assets/images/mission_select_ui.png");
    this.load.image("select_ui_selecter", "assets/images/ui_selecter.png");

    // aircraftselect
    this.load.image("aircraft_select_background", "assets/images/aircraft_select_select.png");
    this.load.image("aircraft_select_ui", "assets/images/aircraft_select_ui.png");
    
    let spec_temp = ["n", "b", "g", "r"];
    for (let i = 0; i < spec_temp.length; i++) {
      this.load.image("specBar_" + i, "assets/images/specBar_" + spec_temp[i] +".png");
    }
    
    for (let i = 0; i < UNIT_DATA.length; i++) {
      this.load.image("unitSelect_" + UNIT_DATA[i].tag, "assets/images/uiButton/unitSelect_" + UNIT_DATA[i].tag +".png");
      this.load.image(UNIT_DATA[i].tag, "assets/images/player/" + UNIT_DATA[i].tag +".png");
    }

    let unittype_temp = ["fighter", "attacker", "multirole", "interceptor", "bomber", "trainer"];
    for (let i = 0; i < unittype_temp.length; i++) {
      this.load.image("unittype_" + unittype_temp[i], "assets/images/unittype_" + unittype_temp[i] + ".png");
    }
    
    for (let i = 0; i < SKIL_DATA.length; i++) {
      this.load.image(SKIL_DATA[i].tag, "assets/images/skilIcon/" + SKIL_DATA[i].tag + ".png");
    }

    // takeoff
    this.load.image("cvn-96_2", "assets/images/npc/cvn-96_2.png");

    this.load.image("ab", "assets/images/augmentor.png");

    this.load.image("background_sae", "assets/images/background/" + "sae.png");

    // GameScene
    for (let i = 0; i < WEAPON_DATA.length; i++) {
      const weapon_tag = WEAPON_DATA[i].tag;
      if (!(weapon_tag.substr(0, 2) == "e_")) {
        this.load.image(WEAPON_DATA[i].tag, "assets/images/bullet/" + WEAPON_DATA[i].tag + ".png");
      }
    }
    
    for (let i = 0; i < ENEMY_DATA.length; i++) {
      this.load.image(ENEMY_DATA[i].tag, "assets/images/npc_unit/" + ENEMY_DATA[i].tag + ".png");
    }
    this.load.image("ea314_propeller_l", "assets/images/parts/ea314_propeller_l.png");
    this.load.image("ea314_propeller_r", "assets/images/parts/ea314_propeller_r.png");
    this.load.image("turbulence_propeller_r", "assets/images/parts/turbulence_propeller_r.png");
    this.load.image("turbulence_propeller_l", "assets/images/parts/turbulence_propeller_l.png");
    this.load.image("turbulence_gun", "assets/images/parts/turbulence_gun.png");

    this.load.image("flare_obj", "assets/images/flare.png");

    this.load.image("boss_text", "assets/images/boss_text.png");
    
    // for (let i = 0; i < 10; i++) {
    //   this.load.image("exp_" + i, "assets/images/explosion/exp_" + i + ".png");
    // }
    this.load.spritesheet("exp_red", "assets/images/explosion/weapon_explosion_red.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("exp_blue", "assets/images/explosion/weapon_explosion_blue.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("explosion", "assets/images/explosion/explosion.png", { frameWidth: 64, frameHeight: 64 });
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
          // this.nextScene = "missionSelectScene";
          this.nextScene = "shootingScene";
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
