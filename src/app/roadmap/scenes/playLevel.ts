import { Ball } from "../objects/ball";

export class playLevel extends Phaser.Scene {
    constructor() {
      super({ key: 'playLevel' });
    }
    preload() {
      console.log('preload method');
      this.load.image('tecno', 'assets/tecno.jpeg');
      this.load.image('ball', 'assets/shinyball.png');
    }
  
    create() {

      var gui = this.add.dom(window.innerWidth/2, 40).createFromHTML(
        `
        <style>
        .gui-info{
            background-color: white;
            margin-left: -0.5cm;
            padding-left: 1cm;
            padding-right: 1cm;
            font-size: large;
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: black;
            border-radius: 20px;
        }
        
        .image{
            width: 60px;
            height: 60px;
            top: -15px;
            left: -25px;
            position: absolute;
        }
        
        .gui{
            width: 500px;
        }
        </style>
          <div class="col-12 row m-4">
          <div class="col-6">
            <img src="/assets/user.png" class="image"/>
            <label class="gui-info">Nombre del Jugador</label>
          </div>
          <div class="col-2">
            <img src="/assets/points.png" class="image"/>
            <label class="gui-info">1500</label>
          </div>
          <div class="col-2">
            <img src="/assets/stage.png" class="image"/>
            <label class="gui-info">3/8</label>
          </div>
          <div class="col-2">
            <img src="/assets/leaderboard.png" class="image"/>
            <label class="gui-info">37th</label>
          </div>
        </div>
        `);

      
      var domElement = this.add.dom(0, 40).createFromHTML(
        `
          <button hidden class="btn btn-primary" id="open" (click)="open();">Boton`+ 1 +`</button>
          <input hidden type="text" name="nameField" placeholder="Enter your name" style="font-size: 32px">
          <input hidden type="button" name="playButton" value="Let's Play" style="font-size: 32px">
          `
        ); 
        
        domElement.addListener('click');
        domElement.on('click', function (event:any) {

          console.log(event);
          if (event.target.id === 'open')
          {
              console.log("clicked 123");
          }
        });

      //var box = this.add.existing(new Ball(this, 200, 200, 'ball')) 
      //var box2 = this.add.existing(new Ball(this, 300, 200, 'ball')) 



    }
  
    update() {
      console.log('update method');
    }
}
  