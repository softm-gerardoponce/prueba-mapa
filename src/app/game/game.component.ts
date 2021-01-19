import { Component, OnInit, ViewChild } from '@angular/core';
import Phaser from 'phaser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import { getMainScene } from './scenes/main';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  width: number = 640;
  height: number = 900;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  scene: Phaser.Scene;

  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal) {
    this.config = {
      type: Phaser.AUTO,
      height: window.innerHeight,
      width: window.innerWidth,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
      },
      backgroundColor: '#000000',
      scene: getMainScene(this),
      parent: 'gameContainer',
      audio: { noAudio: true },
      plugins: {
        global: [
          {
            key: 'rexScale',
            plugin: ScalePlugin,
            start: true,
          },
        ],
      },
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  open() {
    this.modalService.open(this.content);
  }

  initialized() {
    console.log('Inicializado!');
  }
}
