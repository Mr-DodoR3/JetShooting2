class LandingScene extends GameScene {
  constructor (str="landingScene") {
    super(str);

    this.eventTimer;
    this.eventNum;
    
    this.bg_1;

    this.graphics;

    this.cvn = {
      image : null,
      relativeX : DISPLAY_WIDTH / 2 + 52,
      relativeY : DISPLAY_HEIGHT / 2 + 96,
      wire_left : new Phaser.Geom.Line(0, 0, 0, 0),
      wire_right : new Phaser.Geom.Line(0, 0, 0, 0),
      wire_grd : false,
      acceleration : 5
    }
    this.player = {
      image : null
    };
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();

    this.eventTimer = 0;
    this.eventNum = 0;
    this.cvn.acceleration = 5;

    this.bg_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "background_sae");
    this.bg_1.scaleX = this.bg_1.scaleX * 2;
    this.bg_1.scaleY = this.bg_1.scaleY * 2;

    this.cvn.image = this.add.image(this.cvn.relativeX, this.cvn.relativeY - 1200, "cvn-96");
    this.cvn.image.setRotation(-82 * (Math.PI / 180.0) + 90 * (Math.PI / 180.0));
    this.cvn.image.scaleX = this.cvn.image.scaleX * 0.5;
    this.cvn.image.scaleY = this.cvn.image.scaleY * 0.5;

    this.player.image = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 + 200, UNIT_DATA[selectAircraft].tag).setDepth(1);
    this.player.image.scaleX = this.player.image.scaleX * 0.8;
    this.player.image.scaleY = this.player.image.scaleY * 0.8;


    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x000000 } });
    this.cvn.grd = false;
    this.cvn.acceleration = 5;

    this.result = new Result(this);
  }

  update() {
    if (this.eventNum == 0) {
      this.eventTimer++;
      if (this.eventTimer > 60) {
        this.eventNum = 1;
        this.eventTimer = 0;
      }
    }
    else if (this.eventNum == 1) {
      if (this.cvn.image.y < this.cvn.relativeY - 630) {
        this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
      }
      else if (this.player.image.scaleX > 0.5) {
        this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
        this.player.image.scaleX = this.player.image.scaleX * 0.99;
        this.player.image.scaleY = this.player.image.scaleY * 0.99;
      }
      else if (this.cvn.acceleration > -2) {
        this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
        this.cvn.acceleration -= 0.05;
        this.player.image.scaleX = 0.5;
        this.player.image.scaleY = 0.5;
        this.cvn.grd = true;
      }
      else {
        this.eventNum = 2;
      }
    }
    else if (this.eventNum == 2) {
      if (this.cvn.acceleration <= 0) {
        this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
        this.cvn.acceleration += 0.05;
      }
      else {
        this.nextScene = "result";
        this.window = "result";
        this.result.open();
        this.eventNum = 3;
      }
    }

    this.wire_disp();
    if (this.window == "result") {
      if (this.result.update() == "close") {
        this.nextScene = "missionSelectScene";
      }
    }
    super.update();
  }

  wire_disp() {
    this.graphics.clear();

    this.cvn.wire_left.x1 = 428;
    this.cvn.wire_left.x2 = 480;
    this.cvn.wire_left.y1 = this.cvn.image.y + 528;
    if (this.cvn.grd) this.cvn.wire_left.y2 = this.player.image.y + 26;
    else this.cvn.wire_left.y2 = this.cvn.image.y + 528;
    this.graphics.strokeLineShape(this.cvn.wire_left);

    this.cvn.wire_right.x1 = 480;
    this.cvn.wire_right.x2 = 538;
    this.cvn.wire_right.y2 = this.cvn.image.y + 528;
    if (this.cvn.grd) this.cvn.wire_right.y1 = this.player.image.y + 26;
    else this.cvn.wire_right.y1 = this.cvn.image.y + 528;
    this.graphics.strokeLineShape(this.cvn.wire_right);
  }

  contller() {
    if (this.window == "result" && this.result.status == "disp") {
      if (Phaser.Input.Keyboard.JustDown(this.space)) {
        this.result.status = "close";
      }
    }
  }

  sceneChange(next) {
    if (next == "result") {
      if (this.nextSceneDelta < 1.0) {
        this.nextSceneDelta += 0.05;
      }
      else {
        this.nextSceneDelta = 0;
        this.nextScene = -1;
      }
    }
    else {
      if (this.nextSceneDelta < 1.0) {
        this.fade.alpha = this.nextSceneDelta;
        this.nextSceneDelta += 0.05;
      }
      else {
        this.fade.alpha = 1;
        this.scene.start(next);
      }
    }
  }
}
