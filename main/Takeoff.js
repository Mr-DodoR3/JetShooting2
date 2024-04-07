class TekeoffScene extends GameScene {
  constructor () {
    super("tekeoffScene");

    this.eventTimer = 0;
    this.eventNum = 0;
    
    this.bg_1;

    this.cvn = {
      image : null,
      relativeX : DISPLAY_WIDTH / 2 - 69,
      relativeY : DISPLAY_HEIGHT / 2 + 96,
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

    // this.load.image("cvn-96", "assets/images/npc/cvn-96_2.png");
  }

  create() {
    super.create();

    this.bg_1 = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, "background_sae");
    this.bg_1.scaleX = this.bg_1.scaleX * 2;
    this.bg_1.scaleY = this.bg_1.scaleY * 2;

    this.cvn.image = this.add.image(this.cvn.relativeX, this.cvn.relativeY - 100, "cvn-96_2");
    this.cvn.image.scaleX = this.cvn.image.scaleX * 0.5;
    this.cvn.image.scaleY = this.cvn.image.scaleY * 0.5;

    this.player.image = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2, UNIT_DATA[selectAircraft].tag);
    this.player.image.scaleX = this.player.image.scaleX * 0.5;
    this.player.image.scaleY = this.player.image.scaleY * 0.5;
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
      }
    }
    else if (this.eventNum == 1) {
      this.cvn.image.setY(this.cvn.image.y + this.cvn.acceleration);
      this.cvn.acceleration *= 1.02;
      if (this.cvn.image.y > 1200) {
        this.eventNum = 2;
        this.eventTimer = 0;
      }
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
        this.nextScene = "shootingScene"
      }
    }

    super.update();
  }

  contller() {

  }
}