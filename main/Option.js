class Option extends Window {
  constructor(scene) {
    super();
    super.setup(scene, "option");
    this.setup();
  }

  setup() {
    this.vol_select = [
      this.scene.add.image(300 + 47.86 * bgm_vol, 285, "option_noselect"),
      this.scene.add.image(300 + 47.86 * se_vol, 342, "option_noselect")
    ];
    this.close_select = this.scene.add.image(480, 440, "select_ui_selecter").setVisible(false);
    this.button = this.scene.add.image(480, 440, "close_ui");

    this.vol_select[0].setMask(this.mask);
    this.vol_select[1].setMask(this.mask);
    this.close_select.setMask(this.mask);
    this.button.setMask(this.mask);

    this.group.add(this.vol_select[0]);
    this.group.add(this.vol_select[1]);
    this.group.add(this.close_select);
    this.group.add(this.button);
    
    this.group.setVisible(false);
    this.group.setDepth(500);

    this.renew();
  }

  open() {
    this.selectOption = 0;
    this.close_select.scaleX = 1;
    super.open();

    this.renew();
  }

  close() {
    this.group.setVisible(false);
  }

  update() {
    if (this.status == "open") {
      if (this.nextSceneDelta < 1.0) {
        this.maskBox.y -= 9;
        this.maskBox.height += 18;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.status = "disp";
        this.nextSceneDelta = 0;
      }
    }
    else if (this.status == "close") {
      if (this.nextSceneDelta < 1.0) {
        this.maskBox.y += 9;
        this.maskBox.height -= 18;
        this.close_select.scaleX = this.close_select.scaleX * 0.8;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.close_select.scaleX = 0;
        this.selectOption = 0;
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
