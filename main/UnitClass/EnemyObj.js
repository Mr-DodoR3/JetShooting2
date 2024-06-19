// https://labs.phaser.io/edit.html?src=src/game%20objects/container/container%20and%20camera%20zoom.js&v=3.55.2
class EnemyObj extends Phaser.GameObjects.Container {
    constructor(scene) {
      super(scene);
      this.scene = scene;
      this.parts = this.scene.physics.add.group({
        classType: EnemyPartsObj,
        runChildUpdate: true
      });
      this.unit_image = null;

      this.score = 0;
      this.layer = 30;

      this.deg = 0;
      this.del = false;
      this.tag = "";
      this.weapon = "";
      this.reload = 0;
      this.RELOAD_TIME = 60;
      this.burst_reload = 0;
      this.BURST_RELOAD_TIME = -1;
      this.burst = 0;
      this.burst_counter = 0;
  
      this.hp = 100;
  
      this.action_type = -1;
      this.life_time = 0;
  
      this.type = "";
      this.stealth = false;
      this.boss = false;
  
      this.playerPos = { x: 0, y: 0 };

      this.setDepth(30);
    }
  
    colliderSet(tag) {
      if (tag == "turbulence") {
        this.body.offset.x = -128;
        this.body.offset.y = -24;
        this.body.setSize(256, 48, false);
      }
      else {
        // this.body.offset.x = -24;
        // this.body.offset.y = -24;
        // this.body.setSize(48, 48, false);
        this.body.offset.x = -(this.stealth ? 8 : 16);
        this.body.offset.y = -(this.stealth ? 8 : 16);
        this.body.setSize(this.stealth ? 16 : 32, this.stealth ? 16 : 32, false);
      }
    }
  
    createSetup(tag) {
      this.setActive(true);
      this.setVisible(true);

      if (this.boss) {
        this.scaleX = this.scaleX * 1.0;
        this.scaleY = this.scaleY * 1.0;
      }
      else {
        this.scaleX = this.scaleX * 0.5;
        this.scaleY = this.scaleY * 0.5;
      }
      this.colliderSet(tag);
    }

    createImage(tag) {
      const image = this.scene.add.image(0, 0, tag);
      this.unit_image = this.add(image);
    }
  
    create(tag, action, irst=false, bg_speed=1) {
      this.setRotate = true;
      this.bg_speed = bg_speed;

      if (action.length == undefined) {
        this.action_type = action;
      }
      else if (action.length == 2) {
        this.action_type = action;
        this.x = action[0];
        this.y = -32;
        this.deg = action[1];
      }
  
      this.createImage(tag);
      for (let i = 0; i < ENEMY_DATA.length; i++) {
        if (tag == ENEMY_DATA[i].tag) {
          this.score = ENEMY_DATA[i].score;
          this.tag = tag;
          this.hp = ENEMY_DATA[i].hp;
          this.type = ENEMY_DATA[i].attribute;
          
          this.weapon = ENEMY_DATA[i].weapon;
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
          
          for (let j = 0; j < ENEMY_DATA[i].parts.length; j++) {
            const part = this.parts.get();
            part.create(ENEMY_DATA[i].parts[j], j, this.type);
            this.add(part);
          }

          if (ENEMY_DATA[i].importance == "boss") {
            this.boss = true;
          }
          if (!irst) {
            this.stealth = ENEMY_DATA[i].stealth;
          }
        }
      }

      switch (this.type) {
        case "grd":
          this.layer = 30;
          break;
        default:
          this.layer = 40;
          break;
      }
      
      this.createSetup(tag);
    }
  
    damage(d) {
      this.hp -= d;
      if (this.hp < 1) {
        this.destroy();
        let returnData = {
          score: this.score,
          x: this.x,
          y: this.y,
          type: this.boss ? "boss" : "nomal"
        };
        return returnData;
      }
      return -1;
    }
  
    action() {
      if (this.action_type.length == undefined) {
        this.airUnitAction();
      }
      else {
        this.landUnitAction();
      }
    }

    landUnitAction() {
      this.setY(this.y + this.bg_speed);
      if (this.y > 832) {
        this.destroy();
      }
    }

    airUnitAction() {
      switch (this.action_type) {
        case 0:
          if (this.life_time == 0) {
            this.setX(832);
            this.setY(100);
            this.deg = 240;
          }
          else if (this.x > 128) {
            this.setX(this.xForward(3));
            this.setY(this.yForward(3));
            this.deg -= 0.4;
          }
          else {
            this.destroy();
          }
          break;
        case 1:
          if (this.life_time == 0) {
            this.setX(200);
            this.setY(-32);
            this.deg = 285;
          }
          else if (this.y >= -32) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
            this.deg += 0.5;
          }
          else {
            this.destroy();
          }
          break;
        case 2:
          if (this.life_time == 0) {
            this.setX(750);
            this.setY(-32);
            this.deg = 270;
          }
          else if (this.y < 672 && this.x > 128) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
            this.deg -= 0.2;
          }
          else {
            this.destroy();
          }
          break;
        case 3:
          if (this.life_time == 0) {
            this.setX(380);
            this.setY(-32);
            this.deg = 270;
          }
          else if (this.life_time < 100) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
          }
          else if (this.x > 128) {
            this.setX(this.xForward(2));
            this.setY(this.yForward(2));
            this.deg -= 0.5;
          }
          else {
            this.destroy();
          }
          break;
        case 4:
          if (this.life_time == 0) {
            this.setX(580);
            this.setY(-32);
            this.deg = 270;
          }
          else if (this.life_time < 100) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
          }
          else if (this.x < 832) {
            this.setX(this.xForward(2));
            this.setY(this.yForward(2));
            this.deg += 0.5;
          }
          else {
            this.destroy();
          }
          break;
        case 5:
          if (this.life_time == 0) {
            this.setRotate = false;
            this.setX(128);
            this.setY(480);
            this.deg = 0;
          }
          else if (this.y > -32) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
            this.deg += 0.5;
          }
          else {
            this.destroy();
          }
          break;
        case 6:
          if (this.life_time == 0) {
            this.setRotate = false;
            this.setX(832);
            this.setY(480);
            this.deg = 180;
          }
          else if (this.y > -32) {
            this.setX(this.xForward(2.5));
            this.setY(this.yForward(2.5));
            this.deg -= 0.5;
          }
          else {
            this.destroy();
          }
          break;
        case 1000:
          if (this.life_time == 0) {
            this.setX(600);
            this.setY(-128);
            this.deg = 90;
          }
          else if (this.life_time < 369) {
            this.setY(this.yForward(-1));
          }
          break;
        case 1001:
          if (this.life_time == 0) {
            this.setX(360);
            this.setY(-100);
            this.deg = 90;
          }
          else if (this.life_time < 281) {
            this.setY(this.yForward(-1));
          }
          break;
        case -1:
          if (this.life_time == 0) {
            this.setX(480);
            this.setY(300);
            this.deg = 90;
          }
          // this.deg += 5;
          break;
      }
    }
  
    shot() {
      let shot_data = [];
      if (this.RELOAD_TIME < this.reload) {
        if ((this.burst < 2) || (this.BURST_RELOAD_TIME < this.burst_reload)) {
          const tag = "e_" + this.weapon;
          switch (this.weapon) {
            case "m601b":
              shot_data.push({tag: tag, x: this.x, y: this.y, deg: this.deg, layer: this.layer - 1, img: "m601"});
              break;
            default:
              shot_data.push({tag: tag, x: this.x, y: this.y, deg: this.deg, layer: this.layer - 1, img: tag});
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

      this.parts.getChildren().forEach(e => {
        const add_shot = e.shot();
        add_shot.forEach(f => {
          f.x += this.x;
          f.y += this.y;
          shot_data.push(f);
        });
      });
      return shot_data;
    }
  
    update() {
      this.action();
      if (this.setRotate) this.setRotation(this.rad(this.deg));
      this.life_time++;
      
      this.parts.getChildren().forEach(e => {
        e.parentPos = { x: this.x, y: this.y, deg: this.deg };
        e.playerPos = this.playerPos;
      });
    }
  
    xForward(speed) {
      return this.x + speed * Math.cos(this.rad(this.deg + 90))
    }
  
    yForward(speed) {
      return this.y + speed * Math.sin(this.rad(this.deg + 90))
    }
  
    rad(deg) {
      return -deg * (Math.PI / 180.0) + 90 * (Math.PI / 180.0);
    }
}
