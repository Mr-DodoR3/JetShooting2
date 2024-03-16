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

    this.setDepth(41);

    this.reciprocating = 0;
  }

  colliderSet() {
    // this.body.offset.x = 40;
    // this.body.offset.y = 40;
    // this.body.setSize(48, 48, false);
  }

  createSetup(tag) {
    this.setActive(true);
    this.setVisible(true);

    switch(tag) {
      case "ea314_propeller":
        // this.setX(480);
        // this.setY(0);
        // this.setTexture(tag + "_l");
        this.setTexture("fsb18")
        break;
    }
  }

  create(tag, action) {
    this.tag = tag;
    this.createSetup(tag);
    // this.action_type = action;

    // for (let i = 0; i < ENEMY_DATA.length; i++) {
    //   if (tag == ENEMY_DATA[i].tag) {
    //     this.hp = ENEMY_DATA[i].hp;
    //     this.type = ENEMY_DATA[i].attribute;
    //   }
    // }
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
    // if (this.reload_time < this.reload) {
    //   this.reload = 0;
    //   return "e_m601";
    // }
    // else {
    //   this.reload++;
    //   return "none";
    // }
  }

  update() {
    // switch(this.tag) {
    //   case "ea314_propeller":
    //     this.reciprocating++;
    //     if (this.reciprocating > 20) {
    //       this.reciprocating = 0;
    //       this.setTexture(tag + "_l");
    //     }
    //     else if (this.reciprocating == 10) {
    //       this.setTexture(tag + "_r");
    //     }
    //     break;
    // }
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}