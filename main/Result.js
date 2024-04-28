class Result extends Window {
  constructor(scene) {
    super();
    super.setup(scene, "result");
    this.setup();
  }

  setup() {
    this.text_disp_delta = 0;
    this.score = 0;

    this.close_select = this.scene.add.image(480, 440, "select_ui_selecter").setVisible(false).setDepth(501);
    this.button = this.scene.add.image(480, 440, "close_ui").setVisible(false).setDepth(501);

    this.score_txt = this.scene.add.text(170, 240, 'SCORE:0000000000', { font: '36px monospace', fill: '#ffffff' });

    // this.close_select.setMask(this.mask);
    // this.button.setMask(this.mask);
    this.score_txt.setMask(this.mask);
    
    // this.group.add(this.close_select);
    // this.group.add(this.button);
    this.group.add(this.score_txt);

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
        this.maskBox.y -= 10;
        this.maskBox.height += 20;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.status = "disp_set";
        this.nextSceneDelta = 0;
      }
    }
    else if (this.status == "close") {
      if (this.nextSceneDelta < 1.0) {
        this.maskBox.y += 10;
        this.maskBox.height -= 20;
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
    else if (this.status == "disp_set") {
      this.text_disp_delta++;
      if (this.text_disp_delta < 60) {
        this.score += Math.floor(clearData.score / 60);
      }
      else {
        this.status = "disp";
        this.score = clearData.score;
        
        this.close_select.setVisible(true);
        this.button.setVisible(true);
        this.close_select.setMask(this.mask);
        this.button.setMask(this.mask);
        this.group.add(this.close_select);
        this.group.add(this.button);
      }

      this.score_txt.setText("SCORE:" + ("0000000000" + this.score).slice(-10));
    }
  }

  renew() {
    // this.close_select.alpha = this.selectOption == 2 ? 1 : 0;
  }

  control() {
    this.renew();
  }
}
