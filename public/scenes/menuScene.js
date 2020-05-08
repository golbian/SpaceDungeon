import { CST } from "../CST.js";

export class MenuScene extends Phaser.Scene{
  constructor(){
    super(CST.SCENES.MENU);
  }
  init(){
    
  }
  preload(){

  }
  create(){
    
    this.add.image(0,0, CST.IMAGE.BACKGROUND).setOrigin(0);

    this.add.image(400,10, CST.IMAGE.TITLE).setOrigin(0);

    let playButton = this.add.image(350,425, CST.IMAGE.PLAY);

    let optionsButton = this.add.image(400,800, CST.IMAGE.OPTION);

    console.log(CST.AUDIO.TITLE_MUSIC);

    this.sound.play(CST.AUDIO.TITLE_MUSIC, {
      loop: true
    });

    optionsButton.setInteractive();

     optionsButton.on("pointerup",()=>{
      this.scene.launch(CST.SCENES.OPTION)
     });

    playButton.setInteractive();

    playButton.on("pointerup",()=>{
      this.scene.start(CST.SCENES.BATTLE);
      this.scene.setActive(true,CST.SCENES.UI);
      this.scene.start(CST.SCENES.UI);
    });

  }
}
