class ExplosionObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "explosion");
    this.life = 0;
    this.count = 0;
  }

  create (x, y) {
    this.setActive(true);
    this.setVisible(true);

    this.setX(x);
    this.setY(y);
  }

  update () {
    this.count++;
    if (this.count > 2) {
      if (this.life < 10) {
        this.life++;
        this.setTexture("explosion", this.life);
        this.count = 0;
      }
      else {
        this.destroy();
      }
    }
  }
}