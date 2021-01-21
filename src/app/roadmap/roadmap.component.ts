import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Phaser, { AUTO } from 'phaser';
import { DetalleEtapaModalComponent } from '../components/detalle-etapa-modal/detalle-etapa-modal.component';
//import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import { getMainScene } from './scenes/main';


@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoadmapComponent implements OnInit {

  @ViewChild('content') modal: DetalleEtapaModalComponent;

  width: number = 640;
  height: number = 900;
  game: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;
  scene: Phaser.Scene | undefined;

  constructor(
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
    this.modal.open();
  }

  initialized(){
    console.log("Inicializado!")
  }

}
