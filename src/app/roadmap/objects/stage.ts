export class Stage extends Phaser.GameObjects.Image{

    private _scene;
    private image;
    public label = "";
    private status:number = 0;

    constructor(scene, x, y, texture){

        super(scene, x, y, texture);

         this._scene = scene;
         this.setInteractive();
 
         this.on('pointerover', function (pointer) {
             switch(this.status){
                 case -1: 
                    this.setTint(0xbbbbbb); 
                    this.setScale(0.95); 
                 break;
                 default: 
                    this.setTint(0x00ffff);
                    this.setScale(1.2); 
                 break;
             }                   
         });
 
         this.on('pointerout', function (pointer) {
             this.clearTint();
             this.setScale(1);
         });

    }

    setLabel(value:number | string){
        this.label = this._scene.add.text(
            this.x -7,
            this.y - 25 ,
            value,
            {
              font: '24px Arial',
              color: '#000000',
            }
        );    
    }

    setStatus(value:number){
        this.status = value;
        this.drawStatus();
    }

    private drawStatus(){
        this.setFrame(this.status + 1);
    }
 
    
 
 }