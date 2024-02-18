class ShootingScene extends GameScene {
  constructor () {
    super("shootingScene");

    this.graphics;
    this.rect;

    this.player = {
      image: null,
      pos: { x: DISPLAY_WIDTH / 2, y: DISPLAY_HEIGHT / 2 + 200 },
      move: false,
      deg: 0,
      speed: { x: 0, y: 0 },
      action: () => {
        if (this.player.speed.x > 0 && this.player.speed. y > 0) this.player.deg = 45;
        else if (this.player.speed.x < 0 && this.player.speed.y > 0) this.player.deg = 135;
        else if (this.player.speed.x < 0 && this.player.speed.y < 0) this.player.deg = 225;
        else if (this.player.speed.x > 0 && this.player.speed.y < 0) this.player.deg = 315;
        else if (this.player.speed.x > 0) this.player.deg = 0;
        else if (this.player.speed.y > 0) this.player.deg = 90;
        else if (this.player.speed.x < 0) this.player.deg = 180;
        else if (this.player.speed.y < 0) this.player.deg = 270;
        this.player.pos.x += this.player.speed.x * Math.abs(Math.cos(this.rad(this.player.deg)));
        this.player.pos.y -= this.player.speed.y * Math.abs(Math.sin(this.rad(this.player.deg)));
        this.player.image.setX(this.player.pos.x);
        this.player.image.setY(this.player.pos.y);
      }
    };
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.player.image = this.add.image(this.player.pos.x, this.player.pos.y, UNIT_DATA[selectAircraft].tag);
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;

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
  };

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
    this.player.action();
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
    if (this.space.isDown) {
      
    }
  }

  rad (deg) {
    // console.log(parseFloat(deg) * (Math.PI / 180.0))
    return deg * (Math.PI / 180.0);
  }
}
