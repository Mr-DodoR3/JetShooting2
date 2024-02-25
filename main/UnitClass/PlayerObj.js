class PlayerObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "");

    this.move = false;
    this.deg = 0;
    this.speed = { x: 0, y: 0 };
    this.reload = 0;
    this.tag = "";

    this.weponVar_m601 = 0;

    this.setDepth(50);
  }

  colliderSet () {
    this.body.offset.x = 48;
    this.body.offset.y = 48;
    this.body.setSize(32, 32, false);
  }

  create (x, y, tag) {
    this.setX(x);
    this.setY(y);
    this.tag = tag;
    this.setTexture(tag);
    this.scaleX = this.scaleX * 0.5;
    this.scaleY = this.scaleY * 0.5;
    this.colliderSet();
  }

  update () {
    if (this.speed.x > 0 && this.speed.y > 0) this.deg = 45;
    else if (this.speed.x < 0 && this.speed.y > 0) this.deg = 135;
    else if (this.speed.x < 0 && this.speed.y < 0) this.deg = 225;
    else if (this.speed.x > 0 && this.speed.y < 0) this.deg = 315;
    else if (this.speed.x > 0) this.deg = 0;
    else if (this.speed.y > 0) this.deg = 90;
    else if (this.speed.x < 0) this.deg = 180;
    else if (this.speed.y < 0) this.deg = 270;
    let nextPosX = this.x + this.speed.x * Math.abs(Math.cos(this.rad(this.deg)));
    let nextPosY = this.y - this.speed.y * Math.abs(Math.sin(this.rad(this.deg)));
    if (nextPosX < 192) nextPosX = 192;
    if (nextPosX > 768) nextPosX = 768;
    if (nextPosY < 32) nextPosY = 32;
    if (nextPosY > 608) nextPosY = 608;
    this.setX(nextPosX);
    this.setY(nextPosY);
    
    if (this.reload > 4) this.reload = 0;
    else if (this.reload > 0) this.reload++;
  }

  rad (deg) {
    return deg * (Math.PI / 180.0);
  }
}