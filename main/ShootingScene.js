class ShootingScene extends GameScene {
  pouse_menu = new class {
    constructor() {
      this.rad = deg => {
        return deg * (Math.PI / 180.0);
      };

      this.select = 0;
      this.alpha = 90;
    }

    setup(scene) {
      this.group = scene.add.group();
      this.graphics = scene.add.graphics({ fillStyle: { color: 0x910006 }, lineStyle: { width: 0, color: 0x000000 } });
      this.selecter = new Phaser.Geom.Ellipse(480, 300, 600, 28);
      this.title_txt = scene.add.text(480, 220, '=  =  =  P  O  U  S  E  =  =  =', { font: '32px monospace', fill: '#ffffff' }).setOrigin(0.5);
      this.back_txt = scene.add.text(480, 300, 'B  A  C  K    T  O    G  A  M  E', { font: '28px monospace', fill: '#ffffff' }).setOrigin(0.5);
      this.option_txt = scene.add.text(480, 360, 'O  P  T  I  O  N', { font: '28px monospace', fill: '#ffffff' }).setOrigin(0.5);
      this.exit_txt = scene.add.text(480, 420, 'E  X  I  T', { font: '28px monospace', fill: '#ffffff' }).setOrigin(0.5);
      this.title_txt.preFX.addShadow(0, 0, 0.05, 5, 0x0000000, 5, 1);
      this.back_txt.preFX.addShadow(0, 0, 0.05, 5, 0x0000000, 5, 1);
      this.option_txt.preFX.addShadow(0, 0, 0.05, 5, 0x0000000, 5, 1);
      this.exit_txt.preFX.addShadow(0, 0, 0.05, 5, 0x0000000, 5, 1);

      this.group.add(this.graphics);
      this.group.add(this.title_txt);
      this.group.add(this.back_txt);
      this.group.add(this.option_txt);
      this.group.add(this.exit_txt);

      this.group.setDepth(499).setVisible(false);
    }

    up() {
      this.group.setVisible(true);
    }

    close() {
      this.group.setVisible(false);
      this.select = 0;
      this.selecter.y = 300;
      this.disp();
    }
    
    disp() {
      this.alpha += 2;
      if (this.alpha >= 180) this.alpha = 0;

      this.graphics.clear();
      this.graphics.setAlpha(Math.sin(this.rad(this.alpha)));
      this.graphics.fillEllipseShape(this.selecter);
      this.selecter.y = 300 + this.select * 60;
    }
  }();

  boss_text = new class {
    constructor() {
      this.disp = false;
      this.life_time = 0;
      this.img = null;
      this.now_size = { w: null, h: null };
      this.default_size = { w: null, h: null };
    }

    setup(scene) {
      this.img = scene.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "boss_text");
      this.img.scaleX /= 2;
      this.img.scaleY /= 2;
      this.default_size.w = this.img.width;
      this.default_size.h = this.img.height;
      this.img.setDepth(100);
    }

    start() {
      this.disp = true;
      this.now_size.w = 0.5;
      this.now_size.h = 0.5;
    }

    update() {
      if (this.disp) {
        this.img.setVisible(true);
        if (this.life_time < 30) {
          this.now_size.w += 0.05;
          this.now_size.h += 0.05;
        }
        else if (this.life_time < 70) {
          this.now_size.w -= 0.05;
          this.now_size.h -= 0.05;
        }
        else {
          this.disp = false;
        }
        if ((this.life_time % 6) < 3) {
          this.img.setAlpha(0);
        }
        else {
          this.img.setAlpha(1);
        }
        this.img.setDisplaySize(this.now_size.w * this.default_size.w, this.now_size.h * this.default_size.h);
        this.life_time++;
      }
      else {
        this.img.setVisible(false);
      }
    }
  }();

  constructor () {
    super("shootingScene");
    this.enemyDebugMode = true;

    this.graphics;
    this.rect;
    
    // this.enemyProgress = 1;
    // this.enemyCount = 0;
    // this.enemyDelta = 0;
    // this.enemySleep = 0;
    // https://labs.phaser.io/edit.html?src=src/pools/multi%20pools.js&v=3.80.0
    
    this.bg_1;
    this.bg_2;

    this.fl_bar_alpha = 0.0;
    this.ab_bar_alpha = 0.0;
    // this.boss_trigger = 0;
    // this.boss_count = MISSION_DATA[0][0].boss_count;

    this.ucav;
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
    this.fl_bar_alpha = 0.0;
    this.ab_bar_alpha = 0.0;

    this.score = 0;
    
    this.enemyProgress = 1;
    this.enemyCount = 0;
    this.enemyDelta = 0;
    this.enemySleep = 0;

    this.boss_trigger = 0;
    this.boss_count = MISSION_DATA[0][0].boss_count;

    this.pouse_menu.setup(this);
    this.boss_text.setup(this);

    this.bg_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "background_sae");
    this.bg_1.scaleX = this.bg_1.scaleX * 2;
    this.bg_1.scaleY = this.bg_1.scaleY * 2;
    this.bg_2 = this.add.image(DISPLAY_WIDTH / 2, -DISPLAY_HEIGHT / 2, "background_sae");
    this.bg_2.scaleX = this.bg_2.scaleX * 2;
    this.bg_2.scaleY = this.bg_2.scaleY * 2;

    this.graphics = this.add.graphics({ fillStyle: { color: 0x333333 }, lineStyle: { width: 2, color: 0x000000 } });
    this.rect = {
      left_side: new Phaser.Geom.Rectangle(0, 0, 160, DISPLAY_HEIGHT),
      right_side: new Phaser.Geom.Rectangle(800, 0, 160, DISPLAY_HEIGHT),
      flare_bar_back: new Phaser.Geom.Rectangle(20, 520, 6, 80),
      flare_bar: new Phaser.Geom.Rectangle(20, 520, 6, 80),
      flare_bar_white: new Phaser.Geom.Rectangle(20, 520, 6, 80),
      ab_bar_back: new Phaser.Geom.Rectangle(825, 120, 30, 450),
      en_bar_back: new Phaser.Geom.Rectangle(865, 120, 30, 450),
      hp_bar_back: new Phaser.Geom.Rectangle(905, 120, 30, 450),
      ab_bar: [new Phaser.Geom.Rectangle(825, 421, 30, 149), new Phaser.Geom.Rectangle(825, 270.5, 30, 149), new Phaser.Geom.Rectangle(825, 120, 30, 149)],
      ab_bar_white: [new Phaser.Geom.Rectangle(825, 421, 30, 149), new Phaser.Geom.Rectangle(825, 270.5, 30, 149), new Phaser.Geom.Rectangle(825, 120, 30, 149)],
      en_bar: new Phaser.Geom.Rectangle(865, 120, 30, 450),
      hp_bar: new Phaser.Geom.Rectangle(905, 120, 30, 450)
    };
    this.graphics.setDepth(100);
    this.ui_text = {
      score: this.add.text(10, 20, 'SCORE\n0000000000', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
      nomal_weapon: this.add.text(10, 80, "WEAPON 1:", { font: '15px monospace', fill: '#ffffff' }).setDepth(101),
      special_weapon: this.add.text(10, 100, "WEAPON 2:", { font: '15px monospace', fill: '#ffffff' }).setDepth(101),
      flare: this.add.text(45, 520, 'FLARE', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
      flare_counter: this.add.text(80, 580, '0', { font: '36px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5),
      key: [
        this.add.text(102, 308, '移動', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
        this.add.text(54, 348, '通常攻撃', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
        this.add.text(54, 388, '時限強化', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
        this.add.text(54, 428, '緊急回避', { font: '24px monospace', fill: '#ffffff' }).setDepth(101),
        this.add.text(54, 468, '一時停止', { font: '24px monospace', fill: '#ffffff' }).setDepth(101)
      ],
      bar: [
        this.add.text(840, 100, 'AB', { font: '24px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5),
        this.add.text(880, 100, 'EN', { font: '24px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5),
        this.add.text(920, 100, 'HP', { font: '24px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5)
      ],
      unit_name: this.add.text(880, 40, "", { font: '24px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5),
      type_name: this.add.text(880, 64, "test", { font: '18px monospace', fill: '#ffffff' }).setDepth(101).setOrigin(0.5)
    };
    this.ui_image = {
      flare: this.add.image(120, 532, "disp_flare").setDepth(101),
      key: [
        this.add.image(56, 294, "key_c0").setDepth(101),
        this.add.image(30, 320, "key_c1").setDepth(101),
        this.add.image(56, 320, "key_c2").setDepth(101),
        this.add.image(82, 320, "key_c3").setDepth(101),
        this.add.image(30, 360, "key_z").setDepth(101),
        this.add.image(30, 400, "key_x").setDepth(101),
        this.add.image(30, 440, "key_c").setDepth(101),
        this.add.image(30, 480, "key_p").setDepth(101)
      ],
      mfd: {
        mfd: this.add.image(80, 200, "mfd").setDepth(101)
      },
      vol: {
        bgm_back: this.add.image(850, 600, "vol_back").setDepth(101),
        bgm_switch: this.add.image(850, 600, "vol_switch").setDepth(101),
        se_back: this.add.image(910, 600, "vol_back").setDepth(101),
        se_switch: this.add.image(910, 600, "vol_switch").setDepth(101)
      }
    };
    this.ui_image.key.forEach(e => {
      e.setDepth(101);
      e.scaleX = e.scaleX * 0.8;
      e.scaleY = e.scaleY * 0.8;
    });
    const rad = d => { return -d * (Math.PI / 180.0) + 90 * (Math.PI / 180.0) }
    this.ui_image.vol.bgm_switch.setRotation(rad(225 - (bgm_vol / 10 * 270)));
    this.ui_image.vol.se_switch.setRotation(rad(225 - (se_vol / 10 * 270)));

    this.playerGroup = this.physics.add.group({
      classType: PlayerObj,
      maxSize: 1,
      runChildUpdate: true
    });
    this.player = this.playerGroup.get();
    this.player.create(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 200, UNIT_DATA[selectAircraft].tag);
    this.ui_text.nomal_weapon.setText("WEAPON1:" + this.player.waepon_1_name);
    this.ui_text.special_weapon.setText("WEAPON2:" + this.player.waepon_2_name);
    this.ui_text.unit_name.setText(this.player.serial);
    this.ui_text.type_name.setText(this.player.type.toUpperCase());

    this.radar = new Radar(this, this.player.skil.aesa ? "aesa" : "doppler", this.player.skil.irst);

    this.ucavGroup = this.physics.add.group({
      classType: UcavObj,
      maxSize: 1,
      runChildUpdate: true
    });
    if (this.player.skil.ucav) {
      this.ucav = this.ucavGroup.get();
      this.ucav.create(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 140, "amq28");
    }

    this.ab_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab");
    this.ab_1.scaleX = this.ab_1.scaleX * 0.5;
    this.ab_2 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab");
    this.ab_2.scaleX = this.ab_2.scaleX * 0.5;
    if (this.player.tag == "al159") {
      this.ab_1.setDepth(51);
      this.ab_2.setDepth(51);
    }
    
    this.bullets = this.physics.add.group({
      classType: BulletObj,
      runChildUpdate: true
    });

    this.enemys = this.physics.add.group({
      classType: EnemyObj,
      runChildUpdate: true
    });
    // this.enemy = this.enemys.get();
    // this.enemy.create("e");

    this.enemyBullets = this.physics.add.group({
      classType: BulletObj,
      runChildUpdate: true
    });

    this.explosions = this.physics.add.group({
      classType: ExplosionObj,
      runChildUpdate: true
    });
    this.anims.create({
        key: "explosion_start",
        frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    this.flares = this.physics.add.group({
      classType: FlareObj,
      runChildUpdate: true
    });

    this.items = this.physics.add.group({
      classType: ItemObj,
      runChildUpdate: true
    });

    this.physics.add.overlap(this.player, this.enemys, this.clash, null, this);
    this.physics.add.overlap(this.player, this.enemyBullets, this.hit_player, null, this);
    this.physics.add.overlap(this.player, this.items, this.get_item, null, this);
    this.physics.add.overlap(this.bullets, this.enemys, this.hit, null, this);

    // this.ucav = this.add.ucav(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ucav");
    

    if (this.enemyDebugMode) {
      // this.enemy = this.enemys.get();
      // this.enemy.create("yig21", 4);
      // this.enemy.create("turbulence", -1);
      // this.enemy.create("ea314", -1);
      const item = this.items.get();
      if (item) {
        item.create(360, 50);
      }
    }
  };

  clash(player, enemy) {
    if (this.window == "null") {
      
      if (this.player.life && enemy.type == "air" && !enemy.boss) {
        let returnData = enemy.damage(999);
        if (!(returnData == -1)) {
          this.explosion = this.explosions.get();
          this.explosion.create(returnData.x, returnData.y);
        }

        if (player.hit(player.skil.auto ? 200 : 300)) {
          this.explosion = this.explosions.get();
          this.explosion.create(this.player.x, this.player.y);
        }
      }

    }
  }

  hit_player(player, enemyBullet) {
    if (this.window == "null") {

      this.player.augmentorPointGet(Math.floor(enemyBullet.power / 5));
      if (this.player.life) {
        enemyBullet.hit();
        if (player.hit(enemyBullet.power)) {
          this.explosion = this.explosions.get();
          this.explosion.create(this.player.x, this.player.y);
        }
      }

    }
  }

  get_item(player, item) {
    const buff = () => {
      let buff = 1.0;
      if (player.skil.maintain) {
        buff += 0.25;
      }
      if (player.skil.swingwing) {
        buff -= 0.25;
      }
      return buff;
    };

    if (this.window == "null") {
      const type = item.type;
      item.hit();
      switch(type) {
        case 0:
          player.get_item_ab(Math.floor(8 * buff()));
          break;
        case 1:
          player.get_item_en(Math.floor(4 * buff()));
          break;
        case 2:
          player.get_item_hp(Math.floor(4 * buff()));
          break;
        default:
          break;
      }
    }
  }

  hit(bullet, enemy) {
    if (this.window == "null") {

      if (bullet.collision_active) {
        let ab_get = 0;
    
        const damage_point = Math.floor(bullet.power / 20)
        ab_get += damage_point > 0 ? damage_point : 1;
        bullet.hit();
  
        let damage = bullet.power;
        let damage_coefficient = 1.0;
  
        if (this.player.type == "multirole" && (enemy.type == "air" || enemy.type == "grd")) {
          damage_coefficient += 0.1;
          if (this.player.skil.wso) damage_coefficient += 0.1;
        }
        else if (this.player.type == "fighter" && enemy.type == "air") {
          damage_coefficient += 0.2;
          if (this.player.skil.wso) damage_coefficient += 0.1;
        }
        else if (this.player.type == "attacker" && enemy.type == "grd") {
          damage_coefficient += 0.2;
          if (this.player.skil.wso) damage_coefficient += 0.1;
        }
        else if (this.player.type == "interceptor" && this.player.augmentor > 0) {
          damage_coefficient += 0.2;
          if (this.player.skil.wso) damage_coefficient += 0.1;
        }
        else if (this.player.type == "bomber" && enemy.boss) {
          damage_coefficient += 0.2;
          if (this.player.skil.wso) damage_coefficient += 0.1;
        }
  
        if (this.player.skil.asm && enemy.type == "sae") {
          damage_coefficient += 0.4;
        }
  
        damage = Math.floor(damage * damage_coefficient);
  
        // console.log(damage);
        let returnData = enemy.damage(damage);
        if (!(returnData == -1)) {
          ab_get += 20;
          const score = Math.floor(returnData.score * (this.player.skil.coin ? 1.1 : 1.0));
          this.score += score;
          this.explosion = this.explosions.get();
          this.explosion.create(returnData.x, returnData.y);
          if (returnData.type == "boss") {
            this.boss_trigger++;
            if (this.boss_trigger >= this.boss_count) {
              console.log("GAME CLEAR")
            }
          }
        }
        this.player.augmentorPointGet(ab_get);
      }

    }
  }

  pouse() {
    this.window = "pouse";
    this.pouse_menu.up();
    this.playerGroup.runChildUpdate = false;
    this.ucavGroup.runChildUpdate = false;
    this.bullets.runChildUpdate = false;
    this.enemys.runChildUpdate = false;
    this.enemyBullets.runChildUpdate = false;
    this.flares.runChildUpdate = false;
    this.explosions.runChildUpdate = false;
  }

  pouse_cancel() {
    this.window = "null";
    this.pouse_menu.close();
    this.playerGroup.runChildUpdate = true;
    this.ucavGroup.runChildUpdate = true;
    this.bullets.runChildUpdate = true;
    this.enemys.runChildUpdate = true;
    this.enemyBullets.runChildUpdate = true;
    this.flares.runChildUpdate = true;
    this.explosions.runChildUpdate = true;
  }

  background_disp() {
    // if (this.bg_1.y > DISPLAY_HEIGHT * 1.5) {
    //   this.bg_1.y = -DISPLAY_HEIGHT / 2;
    // }
    // else {
    //   this.bg_1.y += 5;
    // }
    // if (this.bg_2.y > DISPLAY_HEIGHT * 1.5) {
    //   this.bg_2.y = -DISPLAY_HEIGHT / 2;
    // }
    // else {
    //   this.bg_2.y += 5;
    // }
  }

  disp_ui() {
    this.graphics.clear();
    this.graphics.fillStyle(0x333333);
    this.graphics.fillRectShape(this.rect.left_side);
    this.graphics.fillRectShape(this.rect.right_side);
    this.graphics.fillStyle(0x000000);
    this.graphics.fillRectShape(this.rect.ab_bar_back);
    this.graphics.strokeRectShape(this.rect.ab_bar_back);

    this.ui_text.score.setText("SCORE\n" + ("0000000000" + this.score).slice(-10));
    this.ui_text.flare_counter.setText(this.player.flare)

    this.graphics.fillRectShape(this.rect.flare_bar_back);
    this.graphics.strokeRectShape(this.rect.flare_bar_back);

    this.graphics.fillRectShape(this.rect.en_bar_back);
    this.graphics.strokeRectShape(this.rect.en_bar_back);

    this.graphics.fillRectShape(this.rect.hp_bar_back);
    this.graphics.strokeRectShape(this.rect.hp_bar_back);
    
    this.graphics.fillStyle(this.player.flare_overheat == 0 ? 0xFF6600 : 0xBF7340);
    const fl_bar_down = Math.abs(80 - 80 * (this.player.flare_overheat / 300));
    this.rect.flare_bar.height = fl_bar_down;
    this.rect.flare_bar.y = 520 + (80 - fl_bar_down);
    this.graphics.fillRectShape(this.rect.flare_bar);
    this.graphics.fillStyle(0xFFFFFF, this.fl_bar_alpha);
    if (this.fl_bar_alpha < 0) this.fl_bar_alpha = 1;
    else this.fl_bar_alpha -= 0.01;
    if (this.player.flare_overheat == 0) this.graphics.fillRectShape(this.rect.flare_bar_white);

    // this.graphics.fillStyle(0xFF6600);
    this.graphics.fillStyle(0x00FFFF);
    for (let i = 0; i < this.rect.ab_bar.length; i++) {
      let ab_bar_down;
      if (i == 2) ab_bar_down = this.player.ab > 1000 ? 0 : Math.abs(150 * ((this.player.ab) / 1000) - 150);
      else if (i == 1 && this.player.ab > 1000) ab_bar_down = this.player.ab > 2000 ? 0 : Math.abs(150 * ((this.player.ab - 1000) / 1000) - 150);
      else if (this.player.ab > 2000) ab_bar_down = Math.abs(150 * ((this.player.ab - 2000) / 1000) - 150);
      this.rect.ab_bar[i].height = 150 - ab_bar_down;
      this.rect.ab_bar[i].y = 120 + (150.5 * i) + ab_bar_down;
      this.rect.ab_bar_white[i].height = this.rect.ab_bar[i].height;
      this.rect.ab_bar_white[i].y = this.rect.ab_bar[i].y;
      this.graphics.fillRectShape(this.rect.ab_bar[i]);
    }
    
    // const max_ab = 1000 * (this.player.skil.swingwing ? 1.4 : 1);
    this.graphics.fillStyle(0xFFFFFF, this.ab_bar_alpha);
    if (this.ab_bar_alpha < 0) this.ab_bar_alpha = 1;
    else this.ab_bar_alpha -= 0.01;
    for (let i = 0; i < this.rect.ab_bar_white.length; i++) {
      if (this.player.augmentor > 0) {
        if (i == 2) {
          this.graphics.fillStyle(0xFFFFFF);
          const ab_bar_down_wh = Math.abs(150 * ((this.player.augmentor) / 1000) - 150);
          this.rect.ab_bar_white[i].height = 150 - ab_bar_down_wh;
          this.rect.ab_bar_white[i].y = 120 + (150.5 * i) + ab_bar_down_wh;
          this.graphics.fillRectShape(this.rect.ab_bar_white[i]);
        }
      }
      else {
        if (i == 2 && this.player.ab >= 1000) this.graphics.fillRectShape(this.rect.ab_bar_white[i]);
        else if (i == 1 && this.player.ab >= 2000) this.graphics.fillRectShape(this.rect.ab_bar_white[i]);
        else if (this.player.ab >= 3000) this.graphics.fillRectShape(this.rect.ab_bar_white[i]);
      }
    }

    const en_bar_down = Math.abs(450 * (this.player.en / this.player.max_en) - 450);
    this.rect.en_bar.height = 450 - en_bar_down;
    this.rect.en_bar.y = 120 + en_bar_down;
    if (this.player.augmentor_overheat > 0) {
      if (Math.floor(this.player.augmentor_overheat / 10) % 2 == 0) {
        this.graphics.fillStyle(0xcccc00);
      }
      else {
        this.graphics.fillStyle(0x000000);
      }
    }
    else if (this.player.augmentor <= 0) {
      this.graphics.fillStyle(0xffff00);
    }
    else {
      this.graphics.fillStyle(0xffffcc);
    }
    this.graphics.fillRectShape(this.rect.en_bar);

    const hp_bar_down = Math.abs(450 * (this.player.hp / 1000) - 450);
    this.rect.hp_bar.height = 450 - hp_bar_down;
    this.rect.hp_bar.y = 120 + hp_bar_down;
    this.graphics.fillStyle(0x00ff00);
    this.graphics.fillRectShape(this.rect.hp_bar);
  }

  enemyPrefabFirst() {
    this.enemyProgress = 0;
    this.enemyCount = MISSION_DATA[0][0].pieces;
    this.enemyDelta = 0;
  }

  enemyPrefab() {
    if (MISSION_DATA[0].length > this.enemyProgress) {
      if (this.enemyCount >= MISSION_DATA[0][this.enemyProgress].pieces) {
        this.enemySleep++;
        if (this.enemySleep > MISSION_DATA[0][this.enemyProgress].sleep) {
          if (MISSION_DATA[0].length > this.enemyProgress + 1) {
            this.enemyProgress++;
            this.enemyDelta = 0;
            this.enemySleep = 0;
            this.enemyCount = 0;
            if (MISSION_DATA[0][this.enemyProgress].repletion == "boss") {
              this.boss_text.start();
            }
          }
          else {

          }
        }
      }
      else if (this.enemyDelta > MISSION_DATA[0][this.enemyProgress].interval) {
        const enemy = this.enemys.get();
        if (enemy) {
          enemy.create(MISSION_DATA[0][this.enemyProgress].tag, MISSION_DATA[0][this.enemyProgress].action_type);
        }
        this.enemyDelta = 0;
        this.enemyCount++;
      }
      else {
        this.enemyDelta++;
      }
    }
  }

  update() {
    if (this.window == "null") {
      
      this.background_disp();
      this.disp_ui();
  
      if (this.player.augmentor > 0) {
        this.ab_1.setVisible(true);
        this.ab_1.setX(this.player.x - this.player.engine_pos[0]);
        this.ab_1.setY(this.player.y + this.player.engine_pos[1]);
        this.ab_2.setVisible(true);
        this.ab_2.setX(this.player.x + this.player.engine_pos[0]);
        this.ab_2.setY(this.player.y + this.player.engine_pos[1]);
      }
      else {
        this.ab_1.setVisible(false);
        this.ab_2.setVisible(false);
      }
  
      if (!this.enemyDebugMode) this.enemyPrefab();
      this.enemys.getChildren().forEach(e => {
        e.playerPos = this.player.getPositionData();
  
        e.shot().forEach(shot_type => {
          const bullet = this.enemyBullets.get();
          if (bullet) {
            bullet.create(shot_type.x, shot_type.y, shot_type.deg, shot_type.tag);
          }
        });
      });

      this.items.getChildren().forEach(e => {
        e.playerPos = this.player.getPositionData();
      });
  
      if (this.player.getWaepon("nomal").tag == "hel" || this.player.getWaepon("sp").tag == "hel")
      this.bullets.getChildren().forEach(e => {
        if (e.tag == "hel") {
          e.x = this.player.x;
        }
      });
  
      if (this.radar) {
        if (this.radar.scan()) {
          let send_data = [];
          send_data.push({ type: "player", x: this.player.x - 160, y: this.player.y, d: 90 });
          this.enemys.getChildren().forEach(e => {
            const enemy_type = e.type == "air" ? "air" : (e.type == "ground" ? "grd" : "sae");
            send_data.push({ type: enemy_type, x: e.x - 160, y: e.y, d: e.deg });
            if (e.boss) {
              send_data.push({ type: "tgt", x: e.x - 160, y: e.y, d: 90 });
            }
          });
          this.radar.setData(send_data);
        }
      }
  
      this.boss_text.update();
    }
    else if (this.window == "pouse") {
      this.pouse_menu.disp();
    }
    
    super.update();
  }

  back_thisScene() {
    this.window = "pouse";
  }

  contller() {
    if (this.window == "null") {
      this.player.move = false;
      const responseSpeed = this.player.skil.fbl ? 0.8 : (this.player.skil.vt ? 0.6 : 0.4);

      const setUcavMove = (x, y) => {      
        if (this.player.skil.ucav) {
          this.ucav.setPosition(this.player.x, this.player.y - 60);
        }
      };
          
      let setPlayerMove = (angle, x, y) => {
        if (x == 0) {
          if (this.player.speed.x > 0.2) this.player.speed.x -= responseSpeed;
          else if (this.player.speed.x < -0.2) this.player.speed.x += responseSpeed;
          else this.player.speed.x = 0;
        }
        else if (x == 1 && this.player.speed.x < this.player.getSpeed()) {
          this.player.speed.x += responseSpeed;
        }
        else if (x == -1 && this.player.speed.x > -this.player.getSpeed()) {
          this.player.speed.x -= responseSpeed;
        }
  
        if (y == 0) {
          if (this.player.speed.y > 0.2) this.player.speed.y -= responseSpeed;
          else if (this.player.speed.y < -0.2) this.player.speed.y += responseSpeed;
          else this.player.speed.y = 0;
        }
        else if (y == 1 && this.player.speed.y < this.player.getSpeed()) {
          this.player.speed.y += responseSpeed;
        }
        else if (y == -1 && this.player.speed.y > -(this.player.getSpeed() * (this.player.skil.reverser ? 1.2 : 1))) {
          this.player.speed.y -= responseSpeed * (this.player.skil.reverser ? 2 : 1);
        }
      
        setUcavMove(x, y);
      };
      let setPlayerMoveVTOL = (angle, x, y) => {
        this.player.x += x;
        this.player.y -= y;
        this.ab_1.setX(this.player.x - this.player.engine_pos[0]);
        this.ab_1.setY(this.player.y + this.player.engine_pos[1]);
        this.ab_2.setX(this.player.x + this.player.engine_pos[0]);
        this.ab_2.setY(this.player.y + this.player.engine_pos[1]);
      
        setUcavMove(x, y);
      }
      
      if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.right.isDown || this.cursors.left.isDown) {
        if (this.player.skil.vtol && this.player.augmentor > 0) {
          this.player.move = false;
    
          if (this.cursors.right.isDown && this.cursors.up.isDown) setPlayerMoveVTOL(45, this.player.getSpeed(), this.player.getSpeed());
          else if (this.cursors.left.isDown && this.cursors.up.isDown) setPlayerMoveVTOL(135, -this.player.getSpeed(), this.player.getSpeed());
          else if (this.cursors.left.isDown && this.cursors.down.isDown) setPlayerMoveVTOL(225, -this.player.getSpeed(), -this.player.getSpeed());
          else if (this.cursors.right.isDown && this.cursors.down.isDown) setPlayerMoveVTOL(315, this.player.getSpeed(), -this.player.getSpeed());
          else if (this.cursors.right.isDown) setPlayerMoveVTOL(0, this.player.getSpeed(), 0);
          else if (this.cursors.up.isDown) setPlayerMoveVTOL(90, 0, this.player.getSpeed());
          else if (this.cursors.left.isDown) setPlayerMoveVTOL(180, -this.player.getSpeed(), 0);
          else if (this.cursors.down.isDown) setPlayerMoveVTOL(270, 0, -this.player.getSpeed());
        }
        else {
          this.player.move = true;
    
          if (this.cursors.right.isDown && this.cursors.up.isDown) setPlayerMove(45, 1, 1);
          else if (this.cursors.left.isDown && this.cursors.up.isDown) setPlayerMove(135, -1, 1);
          else if (this.cursors.left.isDown && this.cursors.down.isDown) setPlayerMove(225, -1, -1);
          else if (this.cursors.right.isDown && this.cursors.down.isDown) setPlayerMove(315, 1, -1);
          else if (this.cursors.right.isDown) setPlayerMove(0, 1, 0);
          else if (this.cursors.up.isDown) setPlayerMove(90, 0, 1);
          else if (this.cursors.left.isDown) setPlayerMove(180, -1, 0);
          else if (this.cursors.down.isDown) setPlayerMove(270, 0, -1);
        }
      }
      else {
        if (this.player.skil.vtol && this.player.augmentor > 0) {
          setPlayerMoveVTOL(this.player.deg, 0, 0);
        }
        else {
          setPlayerMove(this.player.deg, 0, 0);
        }
      }
  
      let shot = (x, y, w="nomal") => {
        let tag = "";
        if (!(w == "ucav")) {
          if (this.player.augmentor <= 0) {
            this.player.en -= this.player.getWaepon(w).en;
          }
          tag = this.player.getWaepon(w).tag;
        }
        else {
          tag = this.ucav.getWaepon().tag;
        }        

        if (tag == "m601") {
          const bullet = this.bullets.get();
          bullet.create(x + (this.player.weponVar_m601 == 0 ? 8 : - 8), y, 90, tag);
          this.player.weponVar_m601 = this.player.weponVar_m601 == 0 ? 1 : 0;
        }
        else if (tag == "l47") {
          const bullet = this.bullets.get();
          bullet.create(x - 4, y, 90, tag);
          let bullet_2 = this.bullets.get();
          bullet_2.create(x + 4, y, 90, tag);
          bullet_2.var_l47 = 1;
        }
        else if (tag == "gs60") {
          const bullet = this.bullets.get();
          bullet.create(x, y, 45, tag);
          const bullet_2 = this.bullets.get();
          bullet_2.create(x, y, 135, tag);
          const bullet_3 = this.bullets.get();
          bullet_3.create(x, y, 270, tag);
        }
        else if (tag == "asraab") {
          const bullet = this.bullets.get();
          bullet.create(x - 10, y, 90, tag);
          const bullet_2 = this.bullets.get();
          bullet_2.create(x + 10, y, 90, tag);
          const bullet_3 = this.bullets.get();
          bullet_3.create(x, y - 10, 90, tag);
        }
        else if (tag == "pj234") {
          const bullet = this.bullets.get();
          bullet.create(x, y, Math.floor(Math.random() * 136) + 45, tag);
        }
        else if (tag == "type25") {
          for (let i = 0; i < 4; i++) {
            const bullet = this.bullets.get();
            bullet.create(x, y, 90, tag);
            bullet.var_type25 = i;
          }
        }
        else if (tag == "atm144") {
          const bullet = this.bullets.get();
          bullet.create(x, y, (this.player.weponVar_atm144 == 0 ? 180 : 0), tag);
          bullet.var_atm144 = this.player.weponVar_atm144;
          this.player.weponVar_atm144 = this.player.weponVar_atm144 == 0 ? 1 : 0;
        }
        else if (tag == "malc") {
          for (let i = 0; i < 4; i++) {
            const bullet = this.bullets.get();
            bullet.create(x, y, 45 + i * 30, tag);
          }
        }
        else if (tag == "gua99") {
          for (let i = 0; i < 6; i++) {
            const bullet = this.bullets.get();
            bullet.create(x + i * 10 - 25, y, 90, tag);
          }
        }
        else if (tag == "jdal") {
          const bullet = this.bullets.get();
          bullet.create(x - 15, y, 90, tag);
          const bullet_2 = this.bullets.get();
          bullet_2.create(x + 15, y, 90, tag);
        }
        else if (tag == "r53") {
          for (let i = 0; i < 11; i++) {
            const bullet = this.bullets.get();
            bullet.create(x, y, 90, tag);
            bullet.var_r53 = i - 5;
          }
        }
        else if (tag == "ciasa") {
          const bullet = this.bullets.get();
          bullet.create(x, y, this.player.weponVar_ciasa, tag);
          if (this.player.weponVar_ciasa_2 == 0) {
            this.player.weponVar_ciasa -= 15;
          }
          else {
            this.player.weponVar_ciasa += 15;
          }
  
          if (this.player.weponVar_ciasa >= 150) {
            this.player.weponVar_ciasa = 150;
            this.player.weponVar_ciasa_2 = 0;
          }
          else if (this.player.weponVar_ciasa <= 30) {
            this.player.weponVar_ciasa = 30;
            this.player.weponVar_ciasa_2 = 1;
          }
        }
        else {
          const bullet = this.bullets.get();
          bullet.create(x, y, 90, tag);
        }
      }
  
      if (((this.key.z.isDown && this.player.en >= this.player.getWaepon().en) || this.player.augmentor > 0) && this.player.augmentor_overheat == 0) {
        if (this.player.reload == 0) {
          shot(this.player.x, this.player.y);
          this.player.reload++;
        }
      }
  
      if (this.player.augmentor > 0) {
        if (this.player.reload_2 == 0) {
          shot(this.player.x, this.player.y, "sp");
          this.player.reload_2++;
        }
      }
      
      if (this.player.skil.ucav) {
        if (this.ucav.reload == 0) {
          shot(this.ucav.x, this.ucav.y, "ucav");
          this.ucav.reload++;
        }
      }
  
      if (this.key.x.isDown) {
        if (this.player.ab >= 1000 && this.player.augmentor == 0) {
          this.player.augmentor = 1000;
          this.player.augmentor_overheat = 0;
        }
      }
  
      if (this.key.c.isDown && this.player.flare > 0 && this.player.flare_overheat <= 0) {
        for (let i = 0; i < 12; i++) {
          const flare = this.flares.get();
          const rad = deg => {
            return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
          };
          if (flare) {
            const deg = 30 * i;
            flare.create(this.player.x + 48 * Math.cos(rad(deg + 90)), this.player.y + 48 * Math.sin(rad(deg + 90)), deg);
          }
        }
        this.player.flare--;
        this.player.flare_overheat = 300;
        for (let i = this.enemyBullets.getChildren().length - 1; i >= 0; i--) {
          this.enemyBullets.getChildren()[i].hit();
        }
      }
  
      if (Phaser.Input.Keyboard.JustDown(this.key.p)) {
        this.pouse();
      }
    }
    else if (this.window == "pouse") {
      if (Phaser.Input.Keyboard.JustDown(this.space)) {
        switch(this.pouse_menu.select) {
          case 0:
            this.pouse_cancel();
            break;
          case 1:
            this.nextScene = "option";
            this.window = "option";
            this.option.open();
            break;
          case 2:
            this.nextScene = "title";
            break
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.key.p)) {
        this.pouse_cancel();
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.pouse_menu.select = this.pouse_menu.select == 0 ? 2 : this.pouse_menu.select - 1;
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        this.pouse_menu.select = this.pouse_menu.select == 2 ? 0 : this.pouse_menu.select + 1;
      }
    }
  }
}
