class EnemyObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;
    this.tag = "";

    this.hp = 10;
  }

  colliderSet () {
    this.body.offset.x = 48;
    this.body.offset.y = 48;
    this.body.setSize(32, 32, false);
  }

  create (x, y, tag) {
    this.setActive(true);
    this.setVisible(true);

    this.setX(x);
    this.setY(y);
    this.setTexture(tag);
    this.scaleX = this.scaleX * 0.5;
    this.scaleY = this.scaleY * 0.5;
    this.colliderSet();
  }

  damage(d) {
    this.hp -= d;
    if (this.hp < 1) {
      this.destroy();
      let pos = {
        x: this.x,
        y: this.y
      };
      return pos;
    }
    return -1;
  }

  update () {
    
  }

  rad (deg) {
    return deg * (Math.PI / 180.0);
  }
}