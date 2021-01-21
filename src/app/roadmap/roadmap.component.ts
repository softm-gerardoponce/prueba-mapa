import { Component, OnInit, ViewChild } from '@angular/core';
import Phaser, { AUTO } from 'phaser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import { getMainScene } from './scenes/main';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
  width: number = 640;
  height: number = 900;
  game: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;
  scene: Phaser.Scene | undefined;


  @ViewChild('content') content:any;

  constructor(
    private modalService: NgbModal
  ) {
    this.config = {
      type: Phaser.AUTO,
      
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
      },
      physics: {
        default: 'arcade',
      },
      backgroundColor: '#000000',
      scene: getMainScene(this),
      parent: 'gameContainer',
      audio: { noAudio: true },
      plugins: {
        /*
        global: [
          {
            key: 'rexScale',
            plugin: ScalePlugin,
            start: true,
          },
        ],*/
      },
      dom: {
        createContainer: true
      }
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  open(){
    this.modalService.open(this.content);
  }

  initialized(){
    console.log("Inicializado!")
  }

}
