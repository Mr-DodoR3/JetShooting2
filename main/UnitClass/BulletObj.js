class BulletObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;

    this.tag = "";
    this.power = 0;

    this.colliderSize = 24;
    
    this.life_time = 0;

    this.var_l47 = 0;
    this.var_pj234 = 0;
    this.var_atm144 = 0;
    this.var_atm144_2 = 0;
    this.var_kkh76 = 0;

    this.collision_active = true;
  }

  colliderSet(size=24) {
    if (size == 64) {
      this.body.offset.x = 0;
      this.body.offset.y = 0;
      this.body.setSize(64, 64, false);
    }
    else {
      this.body.offset.x = 20;
      this.body.offset.y = 20;
      this.body.setSize(24, 24, false);
    }
  }

  create(x, y, d, tag) {
    this.setActive(true);
    this.setVisible(true);

    this.tag = tag;
    this.setX(x);
    this.setY(y);
    this.setRotation(this.rad(d));
    this.deg = d;
    for (let i = 0; i < WEAPON_DATA.length; i++) {
      if (tag == WEAPON_DATA[i].tag) {
        this.type = i;
        this.power = WEAPON_DATA[i].power;
      }
    }
    this.setTexture(tag);
    this.colliderSet();

    if (this.tag == "pj234") {
      this.var_pj234 = Math.floor(Math.random() * 60) + 10;
      this.collision_active = false;
    }
    else if (this.tag == "atm144") {
      this.var_atm144_2 = Math.floor(Math.random() * 6) + 2;
    }
  }

  hit() {
    if (this.tag == "type25")  {
      this.changeExp(10, "exp_blue");
    }
    else if (!(this.tag == "exp_red" || this.tag == "exp_blue")) {
      this.destroy();
    }
  }

  changeExp(power, tag) {
    this.tag = tag;
    this.collision_active = true;
    this.power = power;
    this.setTexture(this.tag);
    this.colliderSet(64);
  }

  update() {
    switch (this.tag) {
      case "m601":
        this.setY(this.y - 10);
        break;
      case "eml12":
        this.setY(this.y - 15);
        break;
      case "l47":
        if (this.life_time < 3) {
          this.setX(this.x + (this.var_l47 == 0 ? -5 : 5));
        }
        this.setY(this.y - 15);
        break;
      case "m6":
        this.setY(this.y - 10);
        this.setAlpha(this.power / 100);
        this.power -= 5;
        if (this.power < 0) {
          this.destroy();
        }
        break;
      case "gs60":
        this.setX(this.xForward(5));
        this.setY(this.yForward(5));
        break;
      case "l50":
        this.setY(this.y - 25);
        break;
      case "asraab":
        this.setY(this.y - 15);
        break;
      case "pj234":
        this.setX(this.xForward(8));
        this.setY(this.yForward(8));
        if (this.life_time > this.var_pj234) {
          this.changeExp(15, "exp_red");
        }
        break;
      case "type25":
        this.setY(this.y - 6);
        break;
      case "atm144":
        this.setRotation(this.rad(this.deg));
        if (this.life_time < 30) {
          this.deg += this.var_atm144_2 * (this.var_atm144 == 0 ? -1 : 1);
        }
        this.setX(this.xForward(12));
        this.setY(this.yForward(12));
        break;
      case "exp_red":
      case "exp_blue":
        this.setAlpha(this.power / 15);
        this.power -= 1;
        if (this.power < 0) {
          this.destroy();
        }
        break;
      case "kkh76":
        this.setX(this.x + Math.sin(this.rad(this.var_kkh76)) * 20);
        this.setY(this.y - 10);
        this.var_kkh76 += 15;
        break;
      case "malc":
        this.setX(this.xForward(9));
        this.setY(this.yForward(9));
        break;
      case "gua99":
        this.setY(this.y - 12);
        break;
      case "jdal":
        this.setY(this.y - 7);
        break;
      case "e_m601":
        this.setX(this.xForward(5));
        this.setY(this.yForward(5));
        break;
    }

    if (this.x < 128 || this.x > 832 || this.y < -32 || this.y > 672) {
      this.destroy();
    }

    this.life_time++;
  }

  xForward(speed) {
    return this.x + speed * Math.cos(this.rad(this.deg + 90));
  }

  yForward(speed) {
    return this.y + speed * Math.sin(this.rad(this.deg + 90));
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}