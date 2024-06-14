class EnemyPartsObj extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene, 0, 0, "");

    this.deg = 0;
    this.type = 0;
    this.del = false;
    this.tag = "";
    this.weapon = "none";
    this.reload = 0;
    this.RELOAD_TIME = 60;
    this.burst_reload = 0;
    this.BURST_RELOAD_TIME = -1;
    this.burst = 0;
    this.burst_counter = 0;

    this.hp = 100;
    this.destruction = false;

    this.type = "";

    this.reciprocating = 0;
    this.rotation_speed = 0;
    this.parentPos = { x: 0, y: 0 };
  
    this.playerPos = { x: 0, y: 0 };
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

        this.weapon = "m601b";
        
        this.rotation_speed = 1;
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
    
    this.reload = 0;
    this.burst_reload = 0;
    this.burst_counter = 0;
    for (let j = 0; j < ENEMY_WEAPON_DATA.length; j++) {
      if (ENEMY_WEAPON_DATA[j].tag == this.weapon) {
        if (ENEMY_WEAPON_DATA[j].burst > 1) {
          this.burst = ENEMY_WEAPON_DATA[j].burst;
          this.BURST_RELOAD_TIME = ENEMY_WEAPON_DATA[j].burst_reload;
        }
        break;
      }
    }
  }

  create(tag, num=0) {
    this.tag = tag;
    this.setDepth(42);
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
    let shot_data = [];
    if (this.RELOAD_TIME < this.reload) {
      if ((this.burst < 2) || (this.BURST_RELOAD_TIME < this.burst_reload)) {
        switch (this.tag) {
          case "turbulence_gun":
            shot_data.push({tag: "e_m601b", x: this.x + this.yForward(-5), y: this.y + this.xForward(5), deg: this.deg, layer: 41, img: "m601"});
            shot_data.push({tag: "e_m601b", x: this.x + this.yForward(5), y: this.y + this.xForward(-5), deg: this.deg, layer: 41, img: "m601"});
            break;
        }
        if (this.burst > 1) {
          this.burst_counter++;
          this.burst_reload = 0;
          if (this.burst_counter >= this.burst) {
            this.burst_counter = 0;
            this.reload = 0;
          }
        }
        else {
          this.reload = 0;
        }
      }
      else if (this.burst > 1) {
        this.burst_reload++;
      }
    }
    else {
      this.reload++;
    }
    // switch(this.tag) {
    //   case "turbulence_gun":
    //     if (this.reload_time < this.reload) {
    //       if (this.BURST_RELOAD_TIME < this.burst_reload) {
    //         this.burst_reload = 0;
    //         this.burst_now++;
    //         shot_data.push({tag: "e_m601", x: this.x + this.yForward(-5), y: this.y + this.xForward(5), deg: this.deg, layer: 41});
    //         shot_data.push({tag: "e_m601", x: this.x + this.yForward(5), y: this.y + this.xForward(-5), deg: this.deg, layer: 41});
    //         if (this.burst <= this.burst_now) {
    //           this.burst_now = 0;
    //           this.reload = 0;
    //         }
    //       }
    //       else {
    //         this.burst_reload++;
    //       }
    //     }
    //     else {
    //       this.reload++;
    //     }
    //     break;
    // }
    return shot_data;
  }

  rotate_target(tgtX, tgtY) {
    let deg = this.deg;
    const tgt_deg = (Math.atan2((this.parentPos.y + this.y) - tgtY, tgtX - (this.parentPos.x + this.x)) * 180) / Math.PI;

    const temp_deg = (deg - tgt_deg + 180) % 360;
    if (180 + this.rotation_speed < temp_deg) {
      deg -= this.rotation_speed;
      if (deg < 0) {
        deg = 360 - deg;
      }
    }
    else if (temp_deg < 180 - this.rotation_speed) {
      deg += this.rotation_speed;
      if (deg > 360) {
        deg = deg - 360;
      }
    }

    return deg;
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
        this.deg = this.rotate_target(this.playerPos.x, this.playerPos.y);
        this.setRotation(this.rad(this.deg));
        break;
    }
  }
  
  xForward(speed) {
    return speed * Math.cos(this.rad(this.deg + 90))
  }

  yForward(speed) {
    return speed * Math.sin(this.rad(this.deg + 90))
  }

  rad(deg) {
    return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
  }
}
