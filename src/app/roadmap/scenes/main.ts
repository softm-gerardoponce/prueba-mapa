import { setContext } from "../services/context-manager";
import { playGame } from "./playGame";
import { playLevel } from "./playLevel";


const SCENES = {
    FIRST: 'playGame',
    SECOND: 'playLevel'
  }

export class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'main' });
    }

    create() {
        console.log('create method');
        this.scene.add(SCENES.FIRST, playGame, true);
        this.scene.add(SCENES.SECOND, playLevel, true);    
        this.scene.run(SCENES.FIRST);
    }

    runScene(){
        this.scene.run(SCENES.SECOND)
    }

    preload() {
      console.log('preload method');
    }
    
    update() {
      console.log('update method');
    }
}

export const getMainScene = (ctx: any) => {
    setContext(ctx);
    return MainScene;
  }