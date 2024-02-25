class BulletObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;
  }

  colliderSet () {
    this.body.offset.x = 28;
    this.body.offset.y = 20;
    this.body.setSize(8, 24, false);
  }

  create (x, y, tag) {
    this.setActive(true);
    this.setVisible(true);

    this.setX(x);
    this.setY(y);
    // for (let i = 0; i < WEAPON_DATA.length; i++) {
    //   if (tag == WEAPON_DATA[i].tag) this.type = i;
    // }
    this.setTexture(tag);
    this.colliderSet();
  }

  hit() {
    this.destroy();
  }

  update () {
    this.setY(this.y - 10);

    if (this.x < 128 || this.x > 832 || this.y < -32 || this.y > 672) {
      this.destroy();
    }
  }

  rad (deg) {
    return deg * (Math.PI / 180.0);
  }
}