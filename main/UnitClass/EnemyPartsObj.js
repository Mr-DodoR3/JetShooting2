class EnemyPartsObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;
    this.tag = "";
    this.reload = 0;
    this.reload_time = 60;

    this.hp = 100;
    this.destruction = false;

    this.type = "";

    this.reciprocating = 0;
  }

  colliderSet() {
    if (this.destruction) {

    }
    else {
      this.body.destroy();
    }
    // this.body.offset.x = 40;
    // this.body.offset.y = 40;
    // this.body.setSize(48, 48, false);
  }

  createSetup(tag, num) {
    this.setActive(true);
    this.setVisible(true);

    switch(tag) {
      case "ea314_propeller":
      case "turbulence_propeller":
        this.setTexture(tag + "_l");
        break;
      case "turbulence_gun":
        this.setTexture(tag);
        this.deg = 270;
        if (num == 0) {
          this.setX(0);
          this.setY(0);
        }
        else {
          this.setX(0);
          this.setY(90);
        }
        break;
    }
  }

  create(tag, num=0) {
    this.tag = tag;
    this.createSetup(tag, num);
    this.colliderSet();
  }

  damage(d) {
    // this.hp -= d;
    // if (this.hp < 1) {
    //   this.destroy();
    //   let returnData = {
    //     score: 0,
    //     x: this.x,
    //     y: this.y
    //   };
    //   return returnData;
    // }
    // return -1;
  }

  action() {
    
  }

  shot() {
    switch(this.tag) {
      case "turbulence_gun":
        if (this.reload_time < this.reload) {
          this.reload = 0;
          return {tag: "e_m601", x: this.x, y: this.y, deg: this.deg};
        }
        else {
          this.reload++;
        }
        break;
    }
    return "none";
  }

  update() {
    switch(this.tag) {
      case "ea314_propeller":
      case "turbulence_propeller":
        this.reciprocating++;
        if (this.reciprocating > 6) {
          this.reciprocating = 0;
          this.setTexture(this.tag + "_l");
        }
        else if (this.reciprocating == 3) {
          this.setTexture(this.tag + "_r");
        }
        break;
      case "turbulence_gun":
        this.setRotation(this.rad(this.deg));
        break;
    }
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}