import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';


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
      height: window.innerHeight,
      width: window.innerWidth,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      backgroundColor: '#000000',
      scene: [ playGame, playLevel ],
      parent: 'gameContainer', 
      audio: { noAudio: true },
      plugins: {
        global: [{
            key: 'rexScale',
            plugin: ScalePlugin,
            start: true
        }]
    } 
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }
}

class playGame  extends Phaser.Scene {
  gameOptions = {
    colors: [0xffffff],
    columns: 4,
    rows: 2,
    thumbWidth: 60,
    thumbHeight: 60,
    spacing: 200,
    localStorageName: "levelselect"
  }

  stars:any = [];
  canMove:boolean;
  itemGroup:any;
  savedData:any;
  pageText:any;
  scrollingMap:any;
  currentPage:any;
  pageSelectors:any;
  reg:any = {};


  constructor() {
    super("PlayGame");
  }

  preload() {
    console.log('preload method');
    this.load.plugin('rexscaleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscaleplugin.min.js', true);

    this.load.spritesheet("levelthumb", "assets/levelthumb.png", {
      frameWidth: 60,
      frameHeight: 60
     });
    this.load.image("menu", "assets/menu.png");
    this.load.image("levelpages", "assets/levelpages.png");
    this.load.image("transp", "assets/transp.png");
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    var obj:any = undefined;
    var menu1:any;
    var menu2:any;
    var menu3:any;
    var despliega:boolean = false;
    this.stars = [];
    this.stars[0] = 0;
    this.canMove = true;
    this.itemGroup = this.add.group();
    for(var l = 1; l < this.gameOptions.columns * this.gameOptions.rows * this.gameOptions.colors.length; l++){
        this.stars[l] = -1;
    }

    // this.savedData = localStorage.getItem(this.gameOptions.localStorageName) == null ? this.stars.toSt   () : localStorage.getItem(this.gameOptions.localStorageName);
    // this.stars = this.savedData.split(",");
    /*this.pageText = this.add.text(width / 2, 16, "Swipe to select level page (1 / " + this.gameOptions.colors.length + ")", {
      fontFamily: "Arial",
      fontSize: '18px',
      color: '#fff',
      stroke: '#fff',
      strokeThickness: 0,
      align: "center",
    });*/
    this.scrollingMap = this.add.tileSprite(0, 0, this.gameOptions.colors.length * width, height, "transp");
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.scrollingMap.setOrigin(0, 0);
    this.currentPage = 0;
    this.pageSelectors = [];
    var rowLength = this.gameOptions.thumbWidth * this.gameOptions.columns + this.gameOptions.spacing * (this.gameOptions.columns - 1);
    var leftMargin = (width - rowLength) / 2 + this.gameOptions.thumbWidth / 2;
    var colHeight = this.gameOptions.thumbHeight * this.gameOptions.rows + this.gameOptions.spacing * (this.gameOptions.rows - 1);
    var topMargin = (height - colHeight) / 2 + this.gameOptions.thumbHeight / 2;

    for(var k = 0; k < this.gameOptions.colors.length; k++){
        for(var i = 0; i < this.gameOptions.columns; i++){
            for(var j = 0; j < this.gameOptions.rows; j++){
              var x = Phaser.Math.RND.between(0, width);
		          var y = Phaser.Math.RND.between(0, height);
              var thumb = this.add.image(k * width + leftMargin + i * (this.gameOptions.thumbWidth + this.gameOptions.spacing), topMargin + j * (this.gameOptions.thumbHeight + 150), "levelthumb");
              //var thumb = this.add.image(x, y, "levelthumb");
              thumb.setTint(this.gameOptions.colors[k]);
              thumb['levelNumber'] = k * (this.gameOptions.rows * this.gameOptions.columns) + j * this.gameOptions.columns + i;
              thumb['levelNumber'];
              thumb.setFrame(parseInt(this.stars[thumb['levelNumber']]) + 1);
              this.itemGroup.add(thumb);
              var levelText = this.add.text(thumb.x, thumb.y - 12, thumb['levelNumber'], {
                        font: "24px Arial",
                        color: "#000000",
                });
              levelText.setOrigin(0.5);
              this.itemGroup.add(levelText);
            }
        }
        this.pageSelectors[k] = this.add.sprite(width / 2 + (k - Math.floor(this.gameOptions.colors.length / 2) + 0.5 * (1 - this.gameOptions.colors.length % 2)) * 40, height - 40, "levelpages");
        this.pageSelectors[k].setInteractive();
        this.pageSelectors[k].on("pointerdown", function(){
          if(this.scene.canMove){
            var difference = this.pageIndex - this.scene.currentPage;
            this.scene.changePage(difference);
            this.scene.canMove = false;
          }
        });
        this.pageSelectors[k].pageIndex = k;
        this.pageSelectors[k].tint = this.gameOptions.colors[k];
        if(k == this.currentPage){
          this.pageSelectors[k].scaleY = 1;
        }
        else{
          this.pageSelectors[k].scaleY = 0.5;
        }
    }
    this.input.on("dragstart", function(pointer, gameObject){
      gameObject.startPosition = gameObject.x;
      gameObject.currentPosition = gameObject.x;
    });
    this.input.on("drag", function(pointer, gameObject, dragX, dragY){
      if(dragX <= 10 && dragX >= -gameObject.width + width - 10){
          gameObject.x = dragX;
          var delta = gameObject.x - gameObject.currentPosition;
          gameObject.currentPosition = dragX;
          this.itemGroup.children.iterate(function(item){
              item.x += delta;
          });
      }
    }, this);
    this.input.on("dragend", function(pointer, gameObject){
      this.canMove = false;
      var delta = gameObject.startPosition - gameObject.x;
      if(delta == 0){
          this.canMove = true;
          this.itemGroup.children.iterate(function(item){
            console.log("DESPLIEGA", despliega)
            if (despliega){
              menu1.destroy()
              menu2.destroy()
              menu3.destroy()
              console.log("se destruyo objeto")
              this.plugins.get('rexScale').scaleDownDestroy(obj, 1000)
              obj = undefined;
              despliega = false;
            }
              if(item.texture.key == "levelthumb"){
                  var boundingBox = item.getBounds();
                  if(Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y) && item.frame.name > 0){
                    //
                    if (!despliega){
                      obj = this.add.group();
                      menu1 = this.add.text(pointer.x + 20, pointer.y, 'Primero!', { fill: '#0f0' }).setInteractive().setVisible(false)
                      .on('pointerdown', () => console.log("Primera opcion"))
                      menu2 = this.add.text(pointer.x + 20, pointer.y + 50, 'Segundo!', { fill: '#0f0' }).setInteractive().setVisible(false)
                      .on('pointerdown', () => console.log("Segunda opcion"))
                      menu3 = this.add.text(pointer.x + 20, pointer.y + 100, 'Tercero!', { fill: '#0f0' }).setInteractive().setVisible(false)
                      .on('pointerdown', () => console.log("Tercera opcion"))
                      //obj = this.add.image(pointer.x, pointer.y, "menu");
                      obj.add(menu1.setVisible(true));
                      obj.add(menu2.setVisible(true));
                      obj.add(menu3.setVisible(true));
                      this.plugins.get('rexScale').popup(obj, 1000).once('complete', function () {
                        despliega = true;
                       })
                    //    this.scene.start("playLevel", {
                    //     level: item.levelNumber,
                    //     stars: this.stars
                    // });
                    }
                    //
                    
                  }
              }
          }, this);
      }
      if(delta > width / 8){
          this.changePage(1);
      }
      else{
          if(delta < -width / 8){
              this.changePage(-1);
          }
          else{
              this.changePage(0);
          }
      }
    }, this);
  }

  update() {
    console.log('update method');
  }

  createModals() {
    //////// modal 4 //////////
    this.reg.modal.createModal({
              type:"modal4",
              includeBackground: true,
              modalCloseOnInput: true,
    itemsArr: [
                {
                  type: "text",
                      content: "Share the awesomeness!",
                      fontFamily: "Luckiest Guy",
                      fontSize: 42,
                      color: "0xfb387c",
                      offsetY: -80
                },
                {
                      type: "image",
                      content: "twitter",
                      offsetY: 20,
                      offsetX: 80,
                      contentScale: 0.8,
                      callback: function(){
                         window.open("https://twitter.com/intent/tweet?text=Cool%20modals%20%40%20http%3A%2F%2Fcodepen.io%2Fnetgfx%2Fpen%2FbNLgaX", 'twitter');
                      }
              },
                  {
                      type: "image",
                      content: "facebook",
                      offsetY: 20,
                      offsetX: -80,
                      contentScale: 0.8,
                      callback: function () {
                          window.open("https://www.facebook.com/sharer.php?u=Cool%20modals%20%40%20http%3A%2F%2Fcodepen.io%2Fnetgfx%2Fpen%2FbNLgaX")
                      }
              }
              ]
     });
  }

  showModal4() {
    this.reg.modal.showModal("modal4");
  }

  changePage(page){
    this.currentPage += page;
    for(var k = 0; k < this.gameOptions.colors.length; k++){
        if(k == this.currentPage){
            this.pageSelectors[k].scaleY = 1;
        }
        else{
            this.pageSelectors[k].scaleY = 0.5;
        }
    }
    //this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + this.gameOptions.colors.length + ")";
    var currentPosition = this.scrollingMap.x;
    this.tweens.add({
        targets: this.scrollingMap,
        x: this.currentPage * -this.sys.game.canvas.width,
        duration: 300,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onUpdate: function(tween, target){
            var delta = target.x - currentPosition;
            currentPosition = target.x;
            this.itemGroup.children.iterate(function(item){
                item.x += delta;
            });
        },
        onComplete: function(){
            this.canMove = true;
        }
    });
  }
}


class playLevel extends Phaser.Scene {
  constructor() {
    super({ key: 'playLevel' });
  }
  preload() {
    console.log('preload method');
    this.load.image('tecno', 'assets/tecno.jpeg');
  }

  create() {
    alert("escena de nivel");
    this.add.image(0,0,'tecno').setOrigin();
  }

  update() {
    console.log('update method');
  }
}