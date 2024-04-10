class Option {
  constructor(scene) {
    this.group;

    this.graphics;
    this.box;

    this.scene = scene;
    this.status = "hide";
    this.nextSceneDelta;
    this.setup(scene);
  }

  setup(scene) {
    this.group = scene.add.group();

    this.selectOption = 0;

    this.graphics = scene.add.graphics({ fillStyle: { color: 0x00004f }, lineStyle: { width: 2, color: 0xffffff } });
    this.box = new Phaser.Geom.Rectangle(120, 140, 720, 360);
    this.graphics.clear();
    this.graphics.fillStyle(0x00004f);
    this.graphics.fillRectShape(this.box);

    this.back = scene.add.image(480, 320, "option");
    this.vol_select = [
      scene.add.image(300 + 47.86 * bgm_vol, 285, "option_noselect"),
      scene.add.image(300 + 47.86 * se_vol, 342, "option_noselect")
    ];
    this.close_select = scene.add.image(480, 440, "select_ui_selecter").setVisible(false);
    this.button = scene.add.image(480, 440, "close_ui");
    
    this.scene = scene;

    this.group.add(this.graphics);
    this.group.add(this.back);
    this.group.add(this.vol_select[0]);
    this.group.add(this.vol_select[1]);
    this.group.add(this.close_select);
    this.group.add(this.button);
    this.group.setVisible(false);

    this.renew();
  }

  open() {
    this.selectOption = 0;
    this.close_select.scaleX = 1;
    this.nextSceneDelta = 0;
    this.status = "disp";
    this.group.setVisible(true);
  }

  close() {
    this.group.setVisible(false);
  }

  update() {
    if (this.status == "close") {
      if (this.nextSceneDelta < 1.0) {
        this.close_select.scaleX = this.close_select.scaleX * 0.8;
        // this.fade.alpha = this.nextSceneDelta;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.close_select.scaleX = 0;
        // this.fade.alpha = 1;
        this.close();
        return "close";
      }
      return "continue";
    }
  }

  renew() {
    for (let i = 0; i < this.vol_select.length; i++) {
      this.vol_select[i].setTexture(this.selectOption == i ? "option_select" : "option_noselect");
      this.vol_select[i].setX(300 + 47.86 * (i == 0 ? bgm_vol : se_vol));
    }
    this.close_select.alpha = this.selectOption == 2 ? 1 : 0;
  }

  control() {

    this.renew();
  }
}
