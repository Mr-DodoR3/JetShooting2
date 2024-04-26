class StoryScene extends GameScene {
  constructor() {
    super("storyScene");
  }

  init() {
    this.storyType_str = "story";
    this.storyType = 0;
    this.now = 0;
    switch(this.storyType_str) {
      case "story":
        this.storyType = 0;
        break;
    }

    this.txt = this.add.text(DISPLAY_WIDTH / 2, 520, STORY_DATA[this.storyType][this.now], { font: '20px monospace', fill: '#ffffff' }).setOrigin(0.5);

    super.init();
  }

  preload() {
    super.preload();
  }

  create() {
    this.img = this.add.image(DISPLAY_WIDTH / 2, DISPLAY_HEIGHT / 2 - 60, "story_00");
    this.img.scaleX /= 3;
    this.img.scaleY /= 3;

    super.create();
  }

  setImage() {
    this.img.setTexture("story_0" + this.now);
    this.txt.setText(STORY_DATA[this.storyType][this.now]);
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.now++;
      if (this.now >= STORY_DATA[this.storyType].length) {
        this.nextScene = "title";
      }
      else {
        this.setImage();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.now++;
      if (this.now >= STORY_DATA[this.storyType].length) {
        this.nextScene = "title";
      }
      else {
        this.setImage();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.now--;
      if (this.now < 0) {
        this.nextScene = "title";
      }
      else {
        this.setImage();
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.nextScene = "title";
    }
  }
}
