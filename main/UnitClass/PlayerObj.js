class PlayerObj extends Phaser.GameObjects.Image {
  constructor (scene) {
    super(scene, 0, 0, "");
    this.life = true;
    this.hp;
    this.en;
    this.ab;

    this.maxSpeed;
    this.defence;
    this.charge;
    this.waepon_1;
    this.waepon_2;
    this.engine_pos = [0, 0];

    this.move = false;
    this.deg = 0;
    this.speed = { x: 0, y: 0 };
    this.tag = "";

    this.reload = 0;
    this.reload_2 = 0;
    this.augmentor = 0;
    this.augmentor_overheat = 0;
    this.charge_counter = 0;
    this.flare = 3;
    this.flare_overheat = 0;
    
    this.weponVar_m601 = 0;
    this.weponVar_atm144 = 0;
    this.weponVar_ciasa = 150;
    this.weponVar_ciasa_2 = 0;

    this.type = "";
    this.skil = {
      cft: false,
      supercruise: false,
      swingwing: false,
      vtol: false,
      vt: false,
      asm: false,
      armor: false,
      maintain: false,
      flare: false,
      irst: false,
      stealth: false,
      wso: false,
      fbl: false,
      coin: false,
      ucav: false,
      auto: false,
      reverser: false,
      nuclear: false
    };

    this.boss = false;

    this.setDepth(50);
  }

  colliderSet() {
    if (this.skil.stealth) {
      this.body.offset.x = 56;
      this.body.offset.y = 56;
      this.body.setSize(16, 16, false);
    }
    else {
      this.body.offset.x = 48;
      this.body.offset.y = 48;
      this.body.setSize(32, 32, false);
    }
  }

  create(x, y, tag) {
    this.hp = 1000;
    this.en = 1000;
    this.ab = 0;

    this.setX(x);
    this.setY(y);
    this.tag = tag;
    this.setTexture(tag);
    this.scaleX = this.scaleX * 0.5;
    this.scaleY = this.scaleY * 0.5;
    this.flare = 3;

    for (let i = 0; i < UNIT_DATA.length; i++) {
      if (tag == UNIT_DATA[i].tag) {
        this.maxSpeed = UNIT_DATA[i].spec[0];
        this.defence = UNIT_DATA[i].spec[1];
        this.charge = UNIT_DATA[i].spec[2];
        this.engine_pos[0] = UNIT_DATA[i].engine_pos[0];
        this.engine_pos[1] = UNIT_DATA[i].engine_pos[1];

        this.type = UNIT_DATA[i].type;

        let waepon_1 = UNIT_DATA[i].weapon;
        let waepon_2 = UNIT_DATA[i].specail_weapon;
        for (let j = 0; j < WEAPON_DATA.length; j++) {
          if (waepon_1 == WEAPON_DATA[j].tag) {
            this.waepon_1 = j;
          }
          if (waepon_2 == WEAPON_DATA[j].tag) {
            this.waepon_2 = j;
          }
        }

        for (let j = 0; j < UNIT_DATA[i].skil.length; j++) {
          if (UNIT_DATA[i].skil[j] == "cft") this.skil.cft = true;
          if (UNIT_DATA[i].skil[j] == "supercruise") this.skil.supercruise = true;
          if (UNIT_DATA[i].skil[j] == "swingwing") this.skil.swingwing = true;
          if (UNIT_DATA[i].skil[j] == "vtol") this.skil.vtol = true;
          if (UNIT_DATA[i].skil[j] == "vt") this.skil.vt = true;
          if (UNIT_DATA[i].skil[j] == "asm") this.skil.asm = true;
          if (UNIT_DATA[i].skil[j] == "armor") this.skil.asm = true;
          if (UNIT_DATA[i].skil[j] == "maintain") this.skil.maintain = true;
          if (UNIT_DATA[i].skil[j] == "flare") this.skil.flare = true;
          if (UNIT_DATA[i].skil[j] == "irst") this.skil.irst = true;
          if (UNIT_DATA[i].skil[j] == "stealth") this.skil.stealth = true;
          if (UNIT_DATA[i].skil[j] == "wso") this.skil.wso = true;
          if (UNIT_DATA[i].skil[j] == "fbl") this.skil.fbl = true;
          if (UNIT_DATA[i].skil[j] == "coin") this.skil.coin = true;
          if (UNIT_DATA[i].skil[j] == "ucav") this.skil.ucav = true;
          if (UNIT_DATA[i].skil[j] == "auto") this.skil.auto = true;
          if (UNIT_DATA[i].skil[j] == "reverser") this.skil.reverser = true;
          if (UNIT_DATA[i].skil[j] == "nuclear") this.skil.nuclear = true;
        }
      }
    }
    
    if (this.skil.flare) {
      this.flare++;
    }

    this.colliderSet();
  }

  getWaepon(w = "nomal") {
    if (w == "nomal") {
      return WEAPON_DATA[this.waepon_1];
    }
    else {
      return WEAPON_DATA[this.waepon_2];
    }
  }

  getSpeed() {
    return 4 + this.maxSpeed / 5;
  }

  augmentorPointGet(point) {
    if (this.augmentor == 0) {
      this.ab += point;
      if (this.ab > 3000) {
        this.ab = 3000;
      }
    }
  }

  augmentorControl() {
    if (this.ab < 3000 && this.augmentor == 0) {
      // this.ab += 15;
    }
    else if (this.augmentor > 0) {
      this.augmentor -= 4;
      this.ab -= 4;
      if (this.augmentor <= 0) {
        this.augmentor == 0;
        this.ab == 0;
        this.augmentor_overheat = 240;
      }
    }
    if (this.augmentor_overheat > 0) {
      this.augmentor_overheat--;
    }
  }

  flareControl() {
    if (this.flare_overheat > 0) {
      this.flare_overheat--;
    }
  }

  hit(power) {
    const damage = power - (power * 0.02 * this.defence);
    this.hp -= damage;
    if (this.hp < 1) {
      this.hp = 0;
      this.life = false;
      this.setActive(false);
      this.setVisible(false);
      return true;
    }
    else {
      return false;
    }
  }

  update() {
    this.augmentorControl();
    this.flareControl();

    if (this.speed.x > 0 && this.speed.y > 0) this.deg = 45;
    else if (this.speed.x < 0 && this.speed.y > 0) this.deg = 135;
    else if (this.speed.x < 0 && this.speed.y < 0) this.deg = 225;
    else if (this.speed.x > 0 && this.speed.y < 0) this.deg = 315;
    else if (this.speed.x > 0) this.deg = 0;
    else if (this.speed.y > 0) this.deg = 90;
    else if (this.speed.x < 0) this.deg = 180;
    else if (this.speed.y < 0) this.deg = 270;
    let nextPosX = this.x + this.speed.x * Math.abs(Math.cos(this.rad(this.deg)));
    let nextPosY = this.y - this.speed.y * Math.abs(Math.sin(this.rad(this.deg)));
    if (nextPosX < 192) nextPosX = 192;
    if (nextPosX > 768) nextPosX = 768;
    if (nextPosY < 32) nextPosY = 32;
    if (nextPosY > 608) nextPosY = 608;
    this.setX(nextPosX);
    this.setY(nextPosY);
    
    if (this.reload > this.getWaepon().reload) this.reload = 0;
    else if (this.reload > 0) this.reload++;
    if (this.reload_2 > this.getWaepon("sp").reload) this.reload_2 = 0;
    else if (this.reload_2 > 0) this.reload_2++;

    if (this.augmentor == 0) {
      this.charge_counter = this.charge_counter > 5 ? 0 : this.charge_counter + 1;
      if (this.en < 1000 && this.augmentor_overheat <= 0 && this.charge_counter == 0) {
        this.en += 5 + this.charge / 2;
        if (this.en > 1000) this.en = 1000;
      }
    }
  }

  getPositionData() {
    return { x: this.x, y: this.y }
  }

  rad(deg) {
    return deg * (Math.PI / 180.0);
  }
}
