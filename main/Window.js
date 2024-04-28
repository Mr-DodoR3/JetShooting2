class Window {
  constructor() {
    this.group;

    this.graphics;
    this.box;

    this.status = "hide";
    this.nextSceneDelta;

    this.back;
  }

  setup(scene, win_name) {
    this.scene = scene;
    this.back = scene.add.image(480, 320, win_name);
    this.maskBox = scene.add.rectangle(480, 320, 729, 0, 0x00004f).setVisible(false);
    this.mask = this.maskBox.createGeometryMask();

    this.group = scene.add.group();

    // this.selectOption = 0;
    
    this.back.setMask(this.mask);
    this.group.add(this.back);
  }

  open() {
    this.nextSceneDelta = 0;
    this.status = "open";
    this.group.setVisible(true);
  }

  close() {
    this.group.setVisible(false);
  }

  update() {
    if (this.status == "open") {
      if (this.nextSceneDelta < 1.0) {
        this.maskBox.y -= 10;
        this.maskBox.height += 20;
        // console.log(this.box.height)
        this.nextSceneDelta += 0.05;
      }
      else {
        this.status = "disp";
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
  }

  control() {
    
  }
}
