import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import Phaser, { AUTO } from 'phaser';
import { DetalleEtapaModalComponent } from '../components/detalle-etapa-modal/detalle-etapa-modal.component';
//import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';
import { getMainScene } from './scenes/main';
import ScalePlugin from 'phaser3-rex-plugins/plugins/scale-plugin.js';


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
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      physics: {
        default: 'arcade',
      },
      backgroundColor: '#000000',
      scene: getMainScene(this),
      parent: 'phaser-game',
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
      dom: {
        createContainer: true,
      },
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  open(){
    this.modal.open();

  }

  getStages(){
    return [
      {
        id:0,
        etapa:"Introducción",
        instrucciones: "Instrucciones 1",
        estatus:"activo"
      },{
        id:1,
        etapa:"Capítulo 1",
        instrucciones: "Instrucciones 2",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 2",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 3",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 4",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 5",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 6",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 7",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
      {
        id:2,
        etapa:"Capítulo 8",
        instrucciones: "Instrucciones 3",
        estatus:"activo"
      },
    ]
  }

  initialized() {
    console.log('Inicializado!');
  }
}
