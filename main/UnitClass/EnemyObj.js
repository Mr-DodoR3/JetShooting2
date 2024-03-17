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

      this.deg = 0;
      this.type = 0;
      this.del = false;
      this.tag = "";
      this.reload = 0;
      this.reload_time = 60;
  
      this.hp = 100;
  
      this.action_type = -1;
      this.life_time = 0;
  
      this.type = "";
      this.boss = false;
  
      this.playerPos = { x: 0, y: 0 };

      this.setDepth(40);
    }
  
    colliderSet(tag) {
      if (tag == "turbulence") {
        this.body.offset.x = -128;
        this.body.offset.y = -24;
        this.body.setSize(256, 48, false);
      }
      else {
        this.body.offset.x = -24;
        this.body.offset.y = -24;
        this.body.setSize(48, 48, false);
      }
    }
  
    createSetup(tag) {
      this.setActive(true);
      this.setVisible(true);

      if (this.boss) {
        this.scaleX = this.scaleX * 1.0;
        this.scaleY = this.scaleY * 1.0;
        console.log("Ok")
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
  
    create(tag, action) {
      this.action_type = action;
  
      this.createImage(tag);
      for (let i = 0; i < ENEMY_DATA.length; i++) {
        if (tag == ENEMY_DATA[i].tag) {
          this.hp = ENEMY_DATA[i].hp;
          this.type = ENEMY_DATA[i].attribute;
          let continued_num = 0;
          let continued_name = "";
          for (let j = 0; j < ENEMY_DATA[i].parts.length; j++) {
            if (continued_name == ENEMY_DATA[i].parts[j]) {
              continued_num++;
            }
            else {
              continued_name = ENEMY_DATA[i].parts[j];
              continued_num = 0;
            }
            const part = this.parts.get();
            part.create(ENEMY_DATA[i].parts[j], continued_num);
            this.add(part);
          }
          if (ENEMY_DATA[i].importance == "boss") {
            this.boss = true;
          }
        }
      }
      
      this.createSetup(tag);
    }
  
    damage(d) {
      this.hp -= d;
      if (this.hp < 1) {
        this.destroy();
        let returnData = {
          score: 0,
          x: this.x,
          y: this.y
        };
        return returnData;
      }
      return -1;
    }
  
    action() {
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
      // if (this.reload_time < this.reload) {
      //   this.reload = 0;
      //   shot_data.push({tag: "e_m601", x: this.x, y: this.y, deg: this.deg});
      // }
      // else {
      //   this.reload++;
      // }
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
      this.setRotation(this.rad(this.deg));
      this.life_time++;
      
      this.parts.getChildren().forEach(e => {
        e.parentPos = { x: this.x, y: this.y };
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
