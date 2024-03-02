class FlareObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "flare_obj");
    
    this.deg;
    this.count = 0;
  }

  create(x, y, deg) {
    this.setActive(true);
    this.setVisible(true);

    this.setX(x);
    this.setY(y);
    this.scaleX = this.scaleX * 0.25;
    this.scaleY = this.scaleY * 0.25;
    this.deg = deg;
    this.body.setSize(0, 0, false);
  }

  update() {
    this.setX(this.x + 15 * Math.cos(this.rad(this.deg + 90)));
    this.setY(this.y + 15 * Math.sin(this.rad(this.deg + 90)));
    if (this.count < 30) {
      this.setAlpha((30 - this.count) / 15);
      this.scaleX *= 1.1;
      this.scaleY *= 1.1;
      this.count++;
    }
    if (this.x < 60 || this.x > 900 || this.y < -100 || this.y > 780) {
      this.destroy();
    }
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}