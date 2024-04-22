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

    if (!load_flag) {
      this.load.image("fade_layer", "assets/images/fade_layer.png");
  
      // Title
      this.load.image("title_ui_selecter", "assets/images/title_ui_selecter.png");
      this.load.image("title", "assets/images/title.png");
      this.load.image("title_ui", "assets/images/title_ui.png");
      this.load.image("fade_layer", "assets/images/fade_layer.png");
      
      this.load.image("option", "assets/images/option/option.png");
      this.load.image("option_noselect", "assets/images/option/option_noselect.png");
      this.load.image("option_select", "assets/images/option/option_select.png");
      this.load.image("close_ui", "assets/images/option/close.png");
  
      // MissionSelect
      this.load.image("mission_select_background", "assets/images/mission_select.png");
      this.load.image("select_ui", "assets/images/mission_select_ui.png");
      this.load.image("select_ui_selecter", "assets/images/ui_selecter.png");
      this.load.image("pin", "assets/images/map_pin.png");
  
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
      this.load.image("amq28", "assets/images/amq28.png");
  
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
          this.load.image("weapon_" + WEAPON_DATA[i].tag, "assets/images/weapon/weapon_" + WEAPON_DATA[i].tag + ".png");
        }
      }
      this.load.image("disp_flare", "assets/images/disp_flare.png");
      
      this.load.image("particle_blue", "assets/images/particle/particle_blue.png");
      this.load.image("particle_green", "assets/images/particle/particle_green.png");
      this.load.image("particle_yellow", "assets/images/particle/particle_yellow.png");
      
      for (let i = 0; i < ENEMY_DATA.length; i++) {
        this.load.image(ENEMY_DATA[i].tag, "assets/images/npc_unit/" + ENEMY_DATA[i].tag + ".png");
      }
      this.load.image("ea314_propeller_l", "assets/images/parts/ea314_propeller_l.png");
      this.load.image("ea314_propeller_r", "assets/images/parts/ea314_propeller_r.png");
      this.load.image("turbulence_propeller_r", "assets/images/parts/turbulence_propeller_r.png");
      this.load.image("turbulence_propeller_l", "assets/images/parts/turbulence_propeller_l.png");
      this.load.image("turbulence_gun", "assets/images/parts/turbulence_gun.png");
  
      this.load.image("flare_obj", "assets/images/flare.png");
      this.load.image("flare_obj", "assets/images/flare.png");
  
      this.load.image("mfd", "assets/images/mfd/mfd.png");
      this.load.image("mfd_mask", "assets/images/mfd/mfd_mask.png");
      this.load.image("player_symbol", "assets/images/mfd/radar_player.png");
      this.load.image("air_symbol", "assets/images/mfd/radar_air.png");
      this.load.image("grd_symbol", "assets/images/mfd/radar_grd.png");
      this.load.image("sae_symbol", "assets/images/mfd/radar_sae.png");
      this.load.image("tgt_symbol", "assets/images/mfd/radar_tgt.png");
  
      this.load.image("vol_back", "assets/images/vol_back.png");
      this.load.image("vol_switch", "assets/images/vol_switch.png");
      
      this.load.image("key_c0", "assets/images/key/key_c0.png");
      this.load.image("key_c1", "assets/images/key/key_c1.png");
      this.load.image("key_c2", "assets/images/key/key_c2.png");
      this.load.image("key_c3", "assets/images/key/key_c3.png");
      this.load.image("key_z", "assets/images/key/key_z.png");
      this.load.image("key_x", "assets/images/key/key_x.png");
      this.load.image("key_c", "assets/images/key/key_c.png");
      this.load.image("key_p", "assets/images/key/key_p.png");
  
      this.load.image("boss_text", "assets/images/boss_text.png");
      
      // for (let i = 0; i < 10; i++) {
      //   this.load.image("exp_" + i, "assets/images/explosion/exp_" + i + ".png");
      // }
      this.load.spritesheet("exp_red", "assets/images/explosion/weapon_explosion_red.png", { frameWidth: 64, frameHeight: 64 });
      this.load.spritesheet("exp_blue", "assets/images/explosion/weapon_explosion_blue.png", { frameWidth: 64, frameHeight: 64 });
      this.load.spritesheet("explosion", "assets/images/explosion/explosion.png", { frameWidth: 64, frameHeight: 64 });

      load_flag = true;
    }
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
  
  back_thisScene() {
    this.window = "none";
    this.selecter.scaleX = 1;
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
          this.nextScene = "missionSelectScene";
          // this.nextScene = "shootingScene";
          break;
        case 1:
          this.nextScene = "storyScene";
          break;
        case 2:
          break;
        case 3:
          this.nextScene = "option";
          this.window = "option";
          this.option.open();
          break;
        case 4:
          break;
        default:
          break;
      }
    }
  }

  sceneChange(next) {
    if (next == "option") {
      if (this.nextSceneDelta < 1.0) {
        this.selecter.scaleX = this.selecter.scaleX * 0.8;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.selecter.scaleX = 0;
        this.nextSceneDelta = 0;
        this.nextScene = -1;
        // this.option.open();
        // this.window = "option";
      }
    }
    else {
      if (this.nextSceneDelta < 1.0) {
        this.selecter.scaleX = this.selecter.scaleX * 0.8;
        this.fade.alpha = this.nextSceneDelta;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.selecter.scaleX = 0;
        this.fade.alpha = 1;
        this.scene.start(next);
      }
    }
  }
}
