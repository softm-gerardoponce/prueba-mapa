export class playLevel extends Phaser.Scene {
    constructor() {
      super({ key: 'playLevel' });
    }
    preload() {
      console.log('preload method');
      this.load.image('tecno', 'assets/tecno.jpeg');
    }
  
    create() {
      alert('escena de nivel');
      this.add.image(0, 0, 'tecno').setOrigin();
    }
  
    update() {
      console.log('update method');
    }
}
  