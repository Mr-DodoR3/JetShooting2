class TekeoffScene extends GameScene {
  constructor (str="tekeoffScene") {
    super(str);

    this.eventTimer;
    this.eventNum;
    
    this.bg_1;

    this.cvn = {
      image : null,
      relativeX : DISPLAY_WIDTH / 2 - 69,
      relativeY : DISPLAY_HEIGHT / 2 + 96,
      acceleration : 5
    }
    this.player = {
      image : null,
      engine_pos : [0, 0]
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
    this.bg_2 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 - DISPLAY_HEIGHT, "background_sae");
    this.bg_2.scaleX = this.bg_2.scaleX * 2;
    this.bg_2.scaleY = this.bg_2.scaleY * 2;
    this.bg_2.setRotation(((deg) => { return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0); })(90));
    this.bg_2.flipY = true;

    this.cvn.image = this.add.image(this.cvn.relativeX, this.cvn.relativeY - 100, "cvn-96_2");
    this.cvn.image.scaleX = this.cvn.image.scaleX * 0.5;
    this.cvn.image.scaleY = this.cvn.image.scaleY * 0.5;

    this.player.image = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, UNIT_DATA[selectAircraft].tag).setDepth(10);
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;

    // console.log(selectAircraft)
    this.ab_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab").setVisible(false).setDepth(selectAircraft == 11 ? 11 : 0);
    this.ab_1.scaleX = this.ab_1.scaleX * 0.5;
    this.ab_2 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "ab").setVisible(false).setDepth(selectAircraft == 11 ? 11 : 0);
    this.ab_2.scaleX = this.ab_2.scaleX * 0.5;
    this.player.engine_pos[0] = UNIT_DATA[selectAircraft].engine_pos[0];
    this.player.engine_pos[1] = UNIT_DATA[selectAircraft].engine_pos[1];
  }

  disp_ab() {
    this.ab_1.setX(this.player.image.x - this.player.engine_pos[0]);
    this.ab_1.setY(this.player.image.y + this.player.engine_pos[1]);
    this.ab_2.setX(this.player.image.x + this.player.engine_pos[0]);
    this.ab_2.setY(this.player.image.y + this.player.engine_pos[1]);
  }

  update() {
    if (this.eventNum == 0) {
      if (this.cvn.image.y < 500) {
        this.player.image.setY(this.cvn.image.y - 100);
        this.cvn.image.setY(this.cvn.image.y + 1);
      }
      else {
        this.eventTimer += 1;
        if (this.eventTimer > 100) {
          this.eventNum = 1;
          this.eventTimer = 0;
        }
        this.disp_ab();
        this.ab_1.setVisible(true);
        this.ab_2.setVisible(true);
      }
    }
    else if (this.eventNum == 1) {
      this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
      this.cvn.acceleration *= 1.02;
      if (this.cvn.image.y > 1200) {
        this.eventNum = 2;
        this.eventTimer = 0;
        this.ab_1.setVisible(false);
        this.ab_2.setVisible(false);
      }
      this.disp_ab();
    }
    else if (this.eventNum == 2) {
      if (this.eventTimer < 50) {
        this.player.image.scaleX = this.player.image.scaleX * 1.01;
        this.player.image.scaleY = this.player.image.scaleY * 1.01;
        this.eventTimer += 1;
      }
      this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
      this.player.image.setY(this.player.image.y -= 8);
      if (this.player.image.y < -100) {
        // console.log("size:"+this.player.image.scaleX)
        this.nextScene = "shootingScene"
      }
    }
    
    if (this.cvn.image.y > DISPLAY_HEIGHT * 3 + (DISPLAY_HEIGHT / 2))
      this.bg_1.setY((this.cvn.image.y + 4) - DISPLAY_HEIGHT * 4);
    else if (this.cvn.image.y > DISPLAY_HEIGHT + (DISPLAY_HEIGHT / 2))
      this.bg_1.setY((this.cvn.image.y + 4) - DISPLAY_HEIGHT * 2);
    else
      this.bg_1.setY(this.cvn.image.y + 4);

    if (this.cvn.image.y > DISPLAY_HEIGHT * 2 + (DISPLAY_HEIGHT / 2))
      this.bg_2.setY((this.cvn.image.y + 4) - DISPLAY_HEIGHT * 3);
    else
    this.bg_2.setY((this.cvn.image.y + 4) - DISPLAY_HEIGHT);

    super.update();
  }

  contller() {

  }
}
