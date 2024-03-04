class BulletObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;

    this.tag = "";
    this.power = 0;

    this.colliderSize = 24;
  }

  colliderSet() {
    this.body.offset.x = 20;
    this.body.offset.y = 20;
    this.body.setSize(24, 24, false);
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
  }

  hit() {
    this.destroy();
  }

  update() {
    switch (this.tag) {
      case "m601":
        this.setY(this.y - 10);
        break;
      case "eml12":
        this.setY(this.y - 15);
        break;
      case "e_m601":
        this.setX(this.xForward(5));
        this.setY(this.yForward(5));
        break;
    }

    if (this.x < 128 || this.x > 832 || this.y < -32 || this.y > 672) {
      this.destroy();
    }
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