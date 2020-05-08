import { CST } from "../CST.js";

export class LoadScene extends Phaser.Scene{
  constructor(){
    super(CST.SCENES.LOAD);
  }
  init(){

  }

  loadImages(){
    this.load.setPath("./assets/image");

    for(let prop in CST.IMAGE){
      this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
    }
  }

  loadAudio(){
    this.load.setPath("./assets/audio");

    for(let prop in CST.AUDIO){
      this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
    }
  }

  loadSprites(){
    this.load.setPath("./assets/sprite");

    // for(let prop in CST.SPRITE.KNIGHT){
    //   this.load.atlas(CST.SPRITE.KNIGHT.SPRITESHEET,CST.SPRITE.KNIGHT.ATLAS)
    // }

    this.load.atlas("characters","/characters/"+CST.SPRITE.CHARACTERS.SPRITESHEET,"/characters/"+CST.SPRITE.CHARACTERS.ATLAS)

    // for(let prop in CST.SPRITE.MAGE){
    //   this.load.atlas(CST.SPRITE.MAGE.SPRITESHEET,CST.SPRITE.MAGE.ATLAS)
    // }

    // for(let prop in CST.SPRITE.ROGUE){
    //   this.load.atlas(CST.SPRITE.ROGUE.SPRITESHEET,CST.SPRITE.ROGUE.ATLAS)
    // }

      this.load.atlas(CST.SPRITE.DEMON.SPRITESHEET,CST.SPRITE.DEMON.ATLAS)

      this.load.atlas(CST.SPRITE.DRAGON.SPRITESHEET,CST.SPRITE.DRAGON.ATLAS)

      this.load.atlas(CST.SPRITE.MEDUSA.SPRITESHEET,CST.SPRITE.MEDUSA.ATLAS)

      this.load.atlas(CST.SPRITE.DJINN.SPRITESHEET,CST.SPRITE.DJINN.ATLAS)
  }

  preload(){
    this.loadImages();
    this.loadAudio();
    this.loadSprites();
  }
  create(){
    this.scene.start(CST.SCENES.MENU);
  }
}
