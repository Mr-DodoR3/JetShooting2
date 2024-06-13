class DisplayEffectObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.graphics = scene.add.graphics({ fillStyle: { color: 0xffffff99 }, lineStyle: { width: 0, color: 0xffffff99 } });
  
    this.graphics.setDepth(91);
    this.setDepth(90);
  }

  create(type="line") {
    this.type = type;

    switch(this.type) {
      case "cloud":
        this.setTexture("cloud_" + (Math.floor(Math.random() * 3) + 1));
        const size = Math.floor(Math.random() * 3) + 0.5;
        this.size = size * this.height;
        this.scaleX = this.scaleX * size;
        this.scaleY = this.scaleY * size;
        this.setRotation(this.rad(Math.floor(Math.random() * 360)));
        this.x = Math.floor(Math.random() * 640) + 160;
        this.y = -this.size;
        this.setAlpha(Math.random() / 4 + 0.6);
        break;
      case "cloud_low":
        break;
      default:
        this.setVisible(false);
        this.rect = new Phaser.Geom.Rectangle(DISPLAY_WIDTH/2, -40, 1, 40);
        this.rect.x = Math.floor(Math.random() * 640) + 160;
        this.rect.y = -40;
        break;
    }
  }

  update() {
    switch(this.type) {
      case "cloud":
      case "cloud_low":
        this.y += 2;
        if (this.y > DISPLAY_HEIGHT + this.size / 2) {
          console.log("destroy")
          this.destroy();
        }
        break;
      default:
        this.graphics.clear();
        this.graphics.fillRectShape(this.rect);
        this.rect.y += 30;
        if (this.rect.y > DISPLAY_HEIGHT + 20) {
          this.destroy();
        }
        break;
    }
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}