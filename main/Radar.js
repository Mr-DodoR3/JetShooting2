class Radar {
  Symbol = class extends Phaser.GameObjects.Image {
    constructor(scene) {
      super(scene, 0, 0, "");
      this.scene;
    }

    create(type, x, y, d=270) {
      this.life_time = 60;
      this.setTexture(type + "_symbol");
      this.setX(Math.round(x / 640 * 96) - 48);
      this.setY(Math.round(y / 640 * 96) - 48);
      this.setRotation(this.rad(d));

      if (type == "tgt") {
        this.setDepth(103);
      }
    }

    update() {
      this.setAlpha(this.life_time / 20);
      this.life_time--;
    }

    rad(deg) {
      return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
    }
  };

  constructor (scene, radar_type="doppler", irst=false) {
    this.scene = scene;

    this.symbols = this.scene.add.group({
      classType: this.Symbol,
      runChildUpdate: true
    });

    this.update = 60;
    this.delta = this.update;

    this.create();
  }

  create() {
    this.container = this.scene.add.container(80, 200).setDepth(102);
    this.mask_img = this.scene.make.image({ x: 80, y: 200, key: 'mfd_mask', add: false });

    this.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.mask_img);

    // this.symbol = this.symbols.get();
    // if (this.symbol) {
    //   this.symbol.create("player", 40, 0, 90);

    //   this.container.add(this.symbol);
    //   this.container.mask = this.mask;
    // }
  }

  scan() {
    this.delta++;
    if (this.delta > this.update) {
      this.delta = 0;
      return true;
    }
    return false;
  }

  setData(data) {
    this.container.removeAll();

    data.forEach(e => {
      const symbol = this.symbols.get();
      if (symbol) {
        symbol.create(e.type, e.x, e.y, e.d);
  
        this.container.add(symbol);
        this.container.mask = this.mask;
      }
    });
  }
}
