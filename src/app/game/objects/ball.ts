
export class Ball extends Phaser.GameObjects.Sprite{

   constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.setInteractive();

        this.on('pointerdown', function (pointer) {
            this.setTint(0xff0000);
            console.log("clicked")
        });

        this.on('pointerup', function (pointer) {
            this.clearTint();
            console.log("clicked")
        });
   }

   

}