import { CST } from "../CST.js";

export class BattleScene extends Phaser.Scene{
  constructor(){
    super(CST.SCENES.BATTLE);
  }
  init(){
    
  }

  preload(){
    //this.load.atlas("characters", "./assets/sprite/characters/characters.png", "./assets/sprite/characters/characters_atlas.json");  
    this.textures.addSpriteSheetFromAtlas("knight", {frameHeight: 128, frameWidth: 128, atlas: "characters", frame: "knight"});
    this.textures.addSpriteSheetFromAtlas("mage", {frameHeight: 128, frameWidth: 128, atlas: "characters", frame: "mage"});
    this.textures.addSpriteSheetFromAtlas("rogue", {frameHeight: 128, frameWidth: 128, atlas: "characters", frame: "rogue"});
  }

  create(){
    
  }

  update(){

  }
}
