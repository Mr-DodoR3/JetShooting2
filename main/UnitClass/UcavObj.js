class UcavObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "");

    this.hp = 1000;
    this.reload = 0;

    this.weapon;

    this.position_log = new Array(10);
    this.create_log = false;

    this.setDepth(61);
  }

  colliderSet() {
    this.body.offset.x = 48;
    this.body.offset.y = 48;
    this.body.setSize(32, 32, false);
  }

  create(x, y, tag) {
    this.setX(x);
    this.setY(y);
    this.tag = tag;
    this.setTexture(tag);
    
    this.scaleX = this.scaleX * 0.5;
    this.scaleY = this.scaleY * 0.5;

    this.hp = 1000;

    this.weapon;
    this.weapon_name = "rb88";

    for (let i = 0; i < WEAPON_DATA.length; i++) {
      if (this.weapon_name == WEAPON_DATA[i].tag) {
        this.weapon = i;
      }
    }

    for (let i = 0; i < this.position_log.length; i++) {
      this.position_log[i] = { x: 480, y: DISPLAY_HEIGHT / 2 + 140 };
    }
    this.create_log = true;

    this.colliderSet();
  }

  getWaepon() {
    return WEAPON_DATA[this.weapon];
  }

  hit(power) {
    const damage = Math.ceil(power - (power * 0.02 * 1));
    this.hp -= damage;
    if (this.hp < 1) {
      this.hp = 0;
      this.life = false;
      this.setActive(false);
      this.setVisible(false);
      return true;
    }
    else {
      return false;
    }
  }

  update() {
    if (this.reload > this.getWaepon().reload) this.reload = 0;
    else if (this.reload > 0) this.reload++;
  }

  setPosition(x, y) {
    if (this.create_log) {
      this.setX(this.position_log[0].x);
      this.setY(this.position_log[0].y);
      this.position_log.shift();
      const pos = { x: x, y: y }
      this.position_log.push(pos);

      // console.log(this.position_log)
    }
  }
}
