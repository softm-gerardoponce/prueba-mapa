import { Ball } from "../objects/ball";

export class playLevel extends Phaser.Scene {
    constructor() {
      super({ key: 'playLevel' });
    }
    preload() {
      console.log('preload method');
      this.load.image('tecno', 'assets/tecno.jpeg');
    }
  
    create() {
      //alert('escena de nivel');
      //this.add.image(0, 0, 'tecno').setOrigin();

      
      var box = this.add.existing(new Ball(this, 200, 200, 'ball')) 

      var box2 = this.add.existing(new Ball(this, 300, 200, 'ball')) 



    }
  
    update() {
      console.log('update method');
    }
}
  