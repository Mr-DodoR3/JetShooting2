class StoryScene extends GameScene {
  constructor() {
    super("storyScene");
    console.log("StoryScene");
  }

  init() {
    super.init();
  }

  preload() {
    super.preload();
    console.log("StoryScene");
  }

  contller() {
    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.nextScene = "title";
    }
  }
}
