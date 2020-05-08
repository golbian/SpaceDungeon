import {LoadScene} from "../scenes/loadScene.js";
import {MenuScene} from "../scenes/menuScene.js";
import {BattleScene} from "../scenes/battleScene.js";
import {LobbyScene} from "../scenes/lobbyScene.js";
import {DungeonScene} from "../scenes/dungeonScene.js";
import { OptionScene } from "../scenes/optionScene.js";
import { UIScene } from "../scenes/UIScene.js";

var w = window.innerWidth;
var h = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: w,
    height: h,
    scene: [
      LoadScene,
      MenuScene,
      BattleScene,
      //LobbyScene,
      OptionScene,
      //DungeonScene,
      UIScene,
    ]
};
var game = new Phaser.Game(config);
