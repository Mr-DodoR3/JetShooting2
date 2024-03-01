class ShootingScene extends GameScene {
  constructor () {
    super("shootingScene");
    this.enemyDebugMode = false;

    this.graphics;
    this.rect;
    
    this.enemyProgress = 0;
    this.enemyCount = 0;
    this.enemyDelta = 0;
    this.enemySleep = 0;
    // https://labs.phaser.io/edit.html?src=src/pools/multi%20pools.js&v=3.80.0
    
    this.bg_1;
    this.bg_2;

    this.ab_bar_alpha = 0.0;
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
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
      ab_bar_back: new Phaser.Geom.Rectangle(825, 120, 30, 450),
      en_bar_back: new Phaser.Geom.Rectangle(865, 120, 30, 450),
      hp_bar_back: new Phaser.Geom.Rectangle(905, 120, 30, 450),
      ab_bar: [new Phaser.Geom.Rectangle(825, 421, 30, 149), new Phaser.Geom.Rectangle(825, 270.5, 30, 149), new Phaser.Geom.Rectangle(825, 120, 30, 149)],
      en_bar: new Phaser.Geom.Rectangle(865, 120, 30, 450),
      hp_bar: new Phaser.Geom.Rectangle(905, 120, 30, 450)
    };
    this.graphics.setDepth(100);
    
    this.playerGroup = this.physics.add.group({
      classType: PlayerObj,
      maxSize: 1,
      runChildUpdate: true
    });
    this.player = this.playerGroup.get();
    this.player.create(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 200, UNIT_DATA[selectAircraft].tag);
    this.ab_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab");
    this.ab_1.scaleX = this.ab_1.scaleX * 0.5;
    this.ab_2 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab");
    this.ab_2.scaleX = this.ab_2.scaleX * 0.5;
    
    this.bullets = this.physics.add.group({
      classType: BulletObj,
      runChildUpdate: true
    });

    this.enemys = this.physics.add.group({
      classType: EnemyObj,
      runChildUpdate: true
    });
    if (this.enemyDebugMode) {
      this.enemy = this.enemys.get();
      // this.enemy.create("yig21", 3);
      this.enemy.create("yig21", 4);
      // this.enemy.create("iac1", -1);
    }

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

    this.physics.add.overlap(this.player, this.enemys, this.clash, null, this);
    this.physics.add.overlap(this.player, this.enemyBullets, this.hit_player, null, this);
    this.physics.add.overlap(this.bullets, this.enemys, this.hit, null, this);
  };

  clash() {
    
  }

  hit_player(player, enemyBullet) {
    enemyBullet.hit();
    player.hp -= 50;
  }

  hit(bullet, enemy) {
    bullet.hit();
    let returnData = enemy.damage(2);
    if (!(returnData == -1)) {
      this.explosion = this.explosions.get();
      this.explosion.create(returnData.x, returnData.y);
    }
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

    const en_bar_down = Math.abs(450 * (this.player.en / 1000) - 450);
    this.rect.en_bar.height = 450 - en_bar_down;
    this.rect.en_bar.y = 120 + en_bar_down;
    this.graphics.fillRectShape(this.rect.en_bar_back);
    this.graphics.strokeRectShape(this.rect.en_bar_back);

    const hp_bar_down = Math.abs(450 * (this.player.hp / 1000) - 450);
    this.rect.hp_bar.height = 450 - hp_bar_down;
    this.rect.hp_bar.y = 120 + hp_bar_down;
    this.graphics.fillRectShape(this.rect.hp_bar_back);
    this.graphics.strokeRectShape(this.rect.hp_bar_back);
    
    this.ab_bar_alpha -= 0.02;
    if (this.ab_bar_alpha < 0) this.ab_bar_alpha = 1.0;
    this.graphics.fillStyle(255, 102 + this.ab_bar_alpha * 153, 0 + this.ab_bar_alpha * 255);
    for (let i = 0; i < this.rect.ab_bar.length; i++) {
      this.graphics.fillRectShape(this.rect.ab_bar[i]);
    }

    this.graphics.fillStyle(0xffff00);
    this.graphics.fillRectShape(this.rect.en_bar);
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
          this.enemyProgress++;
          this.enemyDelta = 0;
          this.enemySleep = 0;
          this.enemyCount = 0;
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
    else {
      // ボス
    }
  }

  update() {
    // this.player.action();
    this.background_disp();
    this.disp_ui();

    this.ab_1.setX(this.player.x - 2);
    this.ab_1.setY(this.player.y + 45);
    this.ab_2.setX(this.player.x + 2);
    this.ab_2.setY(this.player.y + 45);

    if (!this.enemyDebugMode) this.enemyPrefab();
    this.enemys.getChildren().forEach(e => {
      const shot_type = e.shot();
      if (!(shot_type == "none")) {
        const bullet = this.enemyBullets.get();
        if (bullet) {
          bullet.create(e.x, e.y, e.deg, "e_m601");
        }
      }
    });
    super.update();
  }

  contller() {
    this.player.move = false;
        
    let setPlayerMove = (angle, x, y) => {
      if (x == 0) {
        if (this.player.speed.x > 0.2) this.player.speed.x -= 0.5;
        else if (this.player.speed.x < -0.2) this.player.speed.x += 0.5;
        else this.player.speed.x = 0;
      }
      else if (x == 1 && this.player.speed.x < 5) {
        this.player.speed.x += 0.5;
      }
      else if (x == -1 && this.player.speed.x > -5) {
        this.player.speed.x -= 0.5;
      }

      if (y == 0) {
        if (this.player.speed.y > 0.2) this.player.speed.y -= 0.5;
        else if (this.player.speed.y < -0.2) this.player.speed.y += 0.5;
        else this.player.speed.y = 0;
      }
      else if (y == 1 && this.player.speed.y < 5) {
        this.player.speed.y += 0.5;
      }
      else if (y == -1 && this.player.speed.y > -5) {
        this.player.speed.y -= 0.5;
      }
    };
    
    if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.right.isDown || this.cursors.left.isDown) {
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
    else {
      setPlayerMove(this.player.deg, 0, 0);
    }

    if (this.key.z.isDown && this.player.en >= 30) {
      if (this.player.reload == 0) {
        this.player.en -= 30;
        const bullet = this.bullets.get();
        if (bullet) {
          bullet.create(this.player.x + (this.player.weponVar_m601 == 0 ? 8 : - 8), this.player.y, 90, "m601");
        }
        this.player.reload++;
        this.player.weponVar_m601 = this.player.weponVar_m601 == 0 ? 1 : 0;
      }
    }

    if (this.key.x.isDown) {
      
    }

    if (this.key.c.isDown) {
      
    }
  }
}
