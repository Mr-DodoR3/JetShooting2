class ShootingScene extends GameScene {
  constructor () {
    super("shootingScene");

    this.graphics;
    this.rect;
    
    // https://labs.phaser.io/edit.html?src=src/pools/multi%20pools.js&v=3.80.0

    // this.player = {
    //   image: null,
    //   pos: { x: DISPLAY_WIDTH / 2, y: DISPLAY_HEIGHT / 2 + 200 },
    //   move: false,
    //   deg: 0,
    //   speed: { x: 0, y: 0 },
    //   action: () => {
    //     if (this.player.speed.x > 0 && this.player.speed. y > 0) this.player.deg = 45;
    //     else if (this.player.speed.x < 0 && this.player.speed.y > 0) this.player.deg = 135;
    //     else if (this.player.speed.x < 0 && this.player.speed.y < 0) this.player.deg = 225;
    //     else if (this.player.speed.x > 0 && this.player.speed.y < 0) this.player.deg = 315;
    //     else if (this.player.speed.x > 0) this.player.deg = 0;
    //     else if (this.player.speed.y > 0) this.player.deg = 90;
    //     else if (this.player.speed.x < 0) this.player.deg = 180;
    //     else if (this.player.speed.y < 0) this.player.deg = 270;
    //     let nextPosX = this.player.pos.x + this.player.speed.x * Math.abs(Math.cos(this.rad(this.player.deg)));
    //     let nextPosY = this.player.pos.y - this.player.speed.y * Math.abs(Math.sin(this.rad(this.player.deg)));
    //     if (nextPosX < 192) nextPosX = 192;
    //     if (nextPosX > 768) nextPosX = 768;
    //     if (nextPosY < 32) nextPosY = 32;
    //     if (nextPosY > 608) nextPosY = 608;
    //     this.player.pos.x = nextPosX;
    //     this.player.pos.y = nextPosY;
    //     this.player.image.setX(this.player.pos.x);
    //     this.player.image.setY(this.player.pos.y);
    //   }
    // };
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    // this.player.image = this.add.image(this.player.pos.x, this.player.pos.y, UNIT_DATA[selectAircraft].tag);
    // this.player.image.scaleX = this.player.image.scaleX * 0.5;
    // this.player.image.scaleY = this.player.image.scaleY * 0.5;
    // this.player.scaleX = this.player.scaleX * 0.5;
    // this.player.scaleY = this.player.scaleY * 0.5;

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
    
    this.playerGroup = this.physics.add.group({
      classType: PlayerObj,
      maxSize: 1,
      runChildUpdate: true
    });
    this.player = this.playerGroup.get();
    this.player.create(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 200, UNIT_DATA[selectAircraft].tag);
    
    this.bullets = this.physics.add.group({
      classType: BulletObj,
      runChildUpdate: true
    });

    this.enemys = this.physics.add.group({
      classType: EnemyObj,
      runChildUpdate: true
    });
    this.enemy = this.enemys.get();
    this.enemy.create(DISPLAY_WIDTH / 2, 60, "iac1");

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
    this.physics.add.overlap(this.bullets, this.enemys, this.hit, null, this);
  };

  clash() {
    console.log("衝突");
  }

  hit(bullet, enemy) {
    bullet.hit();
    let exp = enemy.damage(1);
    if (!(exp == -1)) {
      this.explosion = this.explosions.get();
      this.explosion.create(exp.x, exp.y);
    }
  }

  disp_ui() {
    this.graphics.clear();
    this.graphics.fillStyle(0x333333);
    this.graphics.fillRectShape(this.rect.left_side);
    this.graphics.fillRectShape(this.rect.right_side);
    this.graphics.fillStyle(0x000000);
    this.graphics.fillRectShape(this.rect.ab_bar_back);
    this.graphics.strokeRectShape(this.rect.ab_bar_back);
    this.graphics.fillRectShape(this.rect.en_bar_back);
    this.graphics.strokeRectShape(this.rect.en_bar_back);
    this.graphics.fillRectShape(this.rect.hp_bar_back);
    this.graphics.strokeRectShape(this.rect.hp_bar_back);
    this.graphics.fillStyle(0xff6600);
    for (let i = 0; i < this.rect.ab_bar.length; i++) {
      this.graphics.fillRectShape(this.rect.ab_bar[i]);
    }
    this.graphics.fillStyle(0xffff00);
    this.graphics.fillRectShape(this.rect.en_bar);
    this.graphics.fillStyle(0x00ff00);
    this.graphics.fillRectShape(this.rect.hp_bar);
  }

  update() {
    // this.player.action();
    this.disp_ui();
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

    if (this.key.z.isDown) {
      if (this.player.reload == 0) {
        const bullet = this.bullets.get();
        if (bullet) {
          bullet.create(this.player.x + (this.player.weponVar_m601 == 0 ? 8 : - 8), this.player.y, "m601");
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
