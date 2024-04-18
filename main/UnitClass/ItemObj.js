class ItemObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.playerPos = { x: 0, y: 0 };
  
    this.setDepth(99);
  }

  colliderSet() {
    this.body.offset.x = 10;
    this.body.offset.y = 10;
    this.body.setSize(12, 12, false);
  }

  create(x, y) {
    this.setActive(true);
    this.setVisible(true);

    this.fx = this.preFX.addColorMatrix();
    
    this.setX(x);
    this.setY(y);
    this.scaleX = 0.4;
    this.scaleY = 0.4;
    this.deg = Math.floor(Math.random() * 360);
    this.speed = 0;
    this.release = Math.floor(Math.random() * 90) + 1;
    this.type = Math.floor(Math.random() * 3);

    this.counter = 0;
    
    this.setTexture(this.type == 0 ? "particle_blue" : (this.type == 1 ? "particle_yellow" : "particle_green"));
    this.setBlendMode(Phaser.BlendModes.ADD);;
    this.colliderSet();
  }

  hit() {
    this.destroy();
  }

  update() {
    const sin_counter = Math.abs(Math.sin(this.counter));
    this.scaleX = 0.4 + (sin_counter / 10);
    this.scaleY = 0.4 + (sin_counter / 10);
    this.fx.brightness(1 + sin_counter);
    
    this.counter += 0.01;
    if (this.counter > Math.PI * 2) {
      this.counter = 0;
    }

    const distance = this.pythagorean(this.x, this.y, this.playerPos.x, this.playerPos.y);
    let deg = this.deg;

    if (this.release <= 0) {
      deg = this.playerPos.y > this.y ? Math.abs(Math.atan2(this.y - this.playerPos.y, this.x - this.playerPos.x)) + Math.PI : Math.abs(Math.atan2(this.playerPos.y - this.y, this.playerPos.x - this.x));
      if (distance < 50) {
        if (this.speed < 90) this.speed += 5;
      }
      else {
        if (this.speed > 0) this.speed -= 5;
      }
    }

    const forward = (speed, deg) => {
      this.x += Math.cos(deg) * speed;
      this.y -= Math.sin(deg) * speed;
    };

    if (this.release <= 0) {
      if (this.speed > 0) {
        const s = Math.sin(this.speed * Math.PI / 180) * 4;
        forward(s, deg);
      }
      else {
        this.y++;
      }
    }
    else {
      this.release -= 5;
      const s = Math.sin((this.release > 90 ? 90 : this.release) * Math.PI / 180) * 4;
      forward(s, deg);
    }

    if (this.y > 656) {
      // console.log("アイテム消滅")
      this.destroy();
    }
  }

  pythagorean(x, y, x2, y2) {
    const len = Math.abs(x - x2) ** 2 + Math.abs(y - y2) ** 2;
    const res = Math.floor(Math.sqrt(len));
    return res;
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}
