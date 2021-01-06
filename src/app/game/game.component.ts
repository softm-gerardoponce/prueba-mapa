import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  width: number = 640;
  height: number = 900;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  scene: Phaser.Scene;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: this.height,
      width: this.width,
      scene: [ MainScene ],
      parent: 'gameContainer',  
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }
}

class MainScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

  // the map itself
	map:any;
	// a couple of variables used to save start touch position
	startX:any;
	startY:any;
	// dummy variable to handle multitouch, if any 
	moveIndex:any;
	// map scrolling speed. The higher the number, the fastest 
	// the scrolling. Leaving it at 1, it's like you are dragging the map
	mapSpeed = 1;
	// group where map and town are placed
  mapGroup:any;
  // the town you are about to select
  candidateTown:any;

  ciudad1:any;
  ciudad2:any;
  ciudad3:any;
  ciudad4:any;
  ciudad5:any;

  constructor() {
    super({ key: 'main' });
  }
  create() {
    let { width, height } = this.sys.game.canvas;
    // this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
    // this.physics.add.existing(this.square);
    this.mapGroup = this.add.group();
    this.map = this.add.image(0, 0, 'map').setOrigin(0, 0);
    console.log('create method');
    // ramdomly placing ten towns
    this.ciudad1 = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town");
    this.ciudad2 = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town"); 
    this.ciudad3 = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town"); 
    this.ciudad4 = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town"); 
    this.ciudad5 = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town");
    

    this.ciudad1.setOrigin().setScale(1.3).setInteractive();
    this.ciudad2.setOrigin().setScale(1.3).setInteractive();
    this.ciudad3.setOrigin().setScale(1.3).setInteractive();
    this.ciudad4.setOrigin().setScale(1.3).setInteractive();
    this.ciudad5.setOrigin().setScale(1.3).setInteractive();

   

    this.ciudad1.on('pointerover', function () {
      this.ciudad1.alpha = 1;
    }) 
    this.ciudad1.on('pointerup', function () {
      alert("se selecciono ciudad 1");
      this.ciudad1.alpha = 0.5;
    }) 

    this.ciudad2.on('pointerover', function () {
      this.ciudad2.alpha = 1;
    }) 
    this.ciudad2.on('pointerup', function () {
      alert("se selecciono ciudad 2");
      this.ciudad2.alpha = 0.5;
    }) 

    this.ciudad3.on('pointerover', function () {
      this.ciudad3.alpha = 1;
    }) 
    this.ciudad3.on('pointerup', function () {
      alert("se selecciono ciudad 3");
      this.ciudad3.alpha = 0.5;
    }) 

    this.ciudad4.on('pointerover', function () {
      this.ciudad4.alpha = 1;
    }) 
    this.ciudad4.on('pointerup', function () {
      alert("se selecciono ciudad 4");
      this.ciudad4.alpha = 0.5;
    }) 

    this.ciudad5.on('pointerover', function () {
      this.ciudad5.alpha = 1;
    }) 
    this.ciudad5.on('pointerup', function () {
      alert("se selecciono ciudad 5");
      this.ciudad5.alpha = 0.5;
    }) 
    

    // for(var i = 0;i < 10; i++){
    //   var town = this.add.image(Phaser.Math.Between(50, this.map.width - 50), Phaser.Math.Between(50, this.map.height - 50), "town");
    //   town.alpha = 0.3;
    //   town.setOrigin().setScale(1.3);
    //   // each town is enabled for input and has its own up and down listeners
    //   town.setInteractive()
    //   town.on('pointerdown', function () {
    //     town.alpha = 1;
    //   }) 
    //   town.on('pointerup', function () {
    //     town.alpha = 0.45;
    //   }) 

    //   //town.events.onInputUp.add(confirmTown, this);
    //   this.mapGroup.add(town);
    // }
    // centering the map
    // this.mapGroup.x = (width - this.map.width) / 2;
    // this.mapGroup.y = (height - this.map.height) / 2;
  }
  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('town', 'assets/town.png')
    console.log('preload method');
  }
  update() {
    console.log('update method');
  }

  handleClick(pointer, targets){
    console.log("clicked0",pointer);
  }

  goFullScreen(){
    this.scale.refresh();
  }
  
  // the player puts the finger/mouse down on a town
  selectTown(sprite, pointer) {
    this.candidateTown = sprite;
  }
   // the player stops touching the town
  confirmTown(sprite, pointer) {
    if(this.candidateTown == sprite){
      alert("Town selected");
  }
}
}
