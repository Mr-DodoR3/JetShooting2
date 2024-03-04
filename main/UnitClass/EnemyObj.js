class EnemyObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;
    this.tag = "";
    this.reload = 0;
    this.reload_time = 60;

    this.hp = 100;

    this.action_type = -1;
    this.life_time = 0;
  }

  colliderSet() {
    this.body.offset.x = 40;
    this.body.offset.y = 40;
    this.body.setSize(48, 48, false);
  }

  createSetup(tag) {
    this.setActive(true);
    this.setVisible(true);

    this.setTexture(tag);
    this.scaleX = this.scaleX * 0.5;
    this.scaleY = this.scaleY * 0.5;
    this.colliderSet();
  }

  create(tag, action) {
    this.createSetup(tag);
    this.action_type = action;

    for (let i = 0; i < ENEMY_DATA.length; i++) {
      if (tag == ENEMY_DATA[i].tag) {
        this.hp = ENEMY_DATA[i].hp;
      }
    }
  }

  // create(tag, x, y) {
  //   this.createSetup(tag);
  //   this.setX(x);
  //   this.setY(y);
  // }

  damage(d) {
    this.hp -= d;
    if (this.hp < 1) {
      this.destroy();
      let returnData = {
        score: 0,
        x: this.x,
        y: this.y
      };
      return returnData;
    }
    return -1;
  }

  action() {
    switch (this.action_type) {
      case 0:
        if (this.life_time == 0) {
          this.setX(832);
          this.setY(100);
          this.deg = 240;
        }
        else if (this.x > 128) {
          this.setX(this.xForward(3));
          this.setY(this.yForward(3));
          this.deg -= 0.4;
        }
        else {
          this.destroy();
        }
        break;
      case 1:
        if (this.life_time == 0) {
          this.setX(200);
          this.setY(-32);
          this.deg = 285;
        }
        else if (this.y >= -32) {
          this.setX(this.xForward(2.5));
          this.setY(this.yForward(2.5));
          this.deg += 0.5;
        }
        else {
          this.destroy();
        }
        break;
      case 2:
        if (this.life_time == 0) {
          this.setX(750);
          this.setY(-32);
          this.deg = 270;
        }
        else if (this.y < 672 && this.x > 128) {
          this.setX(this.xForward(2.5));
          this.setY(this.yForward(2.5));
          this.deg -= 0.2;
        }
        else {
          this.destroy();
        }
        break;
      case 3:
        if (this.life_time == 0) {
          this.setX(380);
          this.setY(-32);
          this.deg = 270;
        }
        else if (this.life_time < 100) {
          this.setX(this.xForward(2.5));
          this.setY(this.yForward(2.5));
        }
        else if (this.x > 128) {
          this.setX(this.xForward(2));
          this.setY(this.yForward(2));
          this.deg -= 0.5;
        }
        else {
          this.destroy();
        }
        break;
      case 4:
        if (this.life_time == 0) {
          this.setX(580);
          this.setY(-32);
          this.deg = 270;
        }
        else if (this.life_time < 100) {
          this.setX(this.xForward(2.5));
          this.setY(this.yForward(2.5));
        }
        else if (this.x < 832) {
          this.setX(this.xForward(2));
          this.setY(this.yForward(2));
          this.deg += 0.5;
        }
        else {
          this.destroy();
        }
        break;
      case -1:
        if (this.life_time == 0) {
          this.setX(480);
          this.setY(300);
          this.deg = 90;
        }
        break;
    }
  }

  shot() {
    if (this.reload_time < this.reload) {
      this.reload = 0;
      return "e_m601";
    }
    else {
      this.reload++;
      return "none";
    }
  }

  update() {
    this.action();
    this.setRotation(this.rad(this.deg));
    this.life_time++;
  }

  xForward(speed) {
    return this.x + speed * Math.cos(this.rad(this.deg + 90))
  }

  yForward(speed) {
    return this.y + speed * Math.sin(this.rad(this.deg + 90))
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}