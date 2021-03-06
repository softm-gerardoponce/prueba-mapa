import { context } from '../services/context-manager';
import { Stage } from '../objects/stage';

export class playGame extends Phaser.Scene {
  gameOptions = {
    colors: [0xffffff],
    columns: 4,
    rows: 2,
    thumbWidth: 60,
    thumbHeight: 60,
    spacing: 200,
    localStorageName: 'levelselect',
  };
  //0xaffccff, 0xfafcfff
  stars: any = [];
  canMove: boolean;
  itemGroup: any;
  savedData: any;
  pageText: any;
  scrollingMap: any;
  currentPage: any;
  pageSelectors: any;
  reg: any = {};
  cursors: any;
  character: any;
  thumb: any;

  scoreboard: any;
  circulos: any = [];

  obj: any = undefined;
  menu1: any;
  menu2: any;
  menu3: any;
  rectangulo: any;
  despliega: boolean = false;
  desplegado: boolean = false;

  text: any;

  points: any = [];
  detenido: boolean = false;
  coordenadas: any = [];

  constructor() {
    super('PlayGame');
  }

  preload() {
    console.log('preload method');
    this.load.plugin(
      'rexscaleplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexscaleplugin.min.js',
      true
    );
    this.load.spritesheet('levelthumb', 'assets/levelthumb.png', {
      frameWidth: 60,
      frameHeight: 60,
    });
    this.load.image('ball', 'assets/sprites/shinyball.png');
    this.load.image('menu', 'assets/menu.png');
    this.load.image('levelpages', 'assets/levelpages.png');
    this.load.image('transp', 'assets/transp.png');
    this.load.atlas('bot', 'assets/running_bot.png', 'assets/running_bot.json');
  }

  crearPuntos(width, height) {
    console.log(width, height);
    this.coordenadas = [
      {
        x: Phaser.Math.RND.between(width * 0.1, width * 0.2),
        y: Phaser.Math.RND.between(height * 0.3, height * 0.35),
      },
      {
        x: Phaser.Math.RND.between(width * 0.4, width * 0.45),
        y: Phaser.Math.RND.between(height * 0.25, height * 0.3),
      },
      {
        x: Phaser.Math.RND.between(width * 0.7, width * 0.75),
        y: Phaser.Math.RND.between(height * 0.3, height * 0.35),
      },
      {
        x: Phaser.Math.RND.between(width * 0.9, width * 0.925),
        y: Phaser.Math.RND.between(height * 0.5, height * 0.55),
      },
      {
        x: Phaser.Math.RND.between(width * 0.7, width * 0.75),
        y: Phaser.Math.RND.between(height * 0.8, height * 0.85),
      },
      {
        x: Phaser.Math.RND.between(width * 0.5, width * 0.55),
        y: Phaser.Math.RND.between(height * 0.6, height * 0.65),
      },
      {
        x: Phaser.Math.RND.between(width * 0.2, width * 0.25),
        y: Phaser.Math.RND.between(height * 0.6, height * 0.65),
      },
      {
        x: Phaser.Math.RND.between(width * 0.4, width * 0.45),
        y: Phaser.Math.RND.between(height * 0.8, height * 0.85),
      },
    ];
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    this.crearPuntos(width, height);
    console.log(this.coordenadas);
    this.cameras.main.setBounds(0, 0, width, height);
    this.anims.create({
      key: 'run',
      frames: [
        {
          key: 'bot',
          frame: 'run00',
        },
        {
          key: 'bot',
          frame: 'run01',
        },
        {
          key: 'bot',
          frame: 'run02',
        },
        {
          key: 'bot',
          frame: 'run03',
        },
        {
          key: 'bot',
          frame: 'run04',
        },
        {
          key: 'bot',
          frame: 'run05',
        },
        {
          key: 'bot',
          frame: 'run06',
        },
        {
          key: 'bot',
          frame: 'run07',
        },
        {
          key: 'bot',
          frame: 'run08',
        },
        {
          key: 'bot',
          frame: 'run09',
        },
      ],
      frameRate: 13,
      repeat: -1,
    });
    this.stars = [];
    this.stars[0] = 3;
    this.canMove = true;
    this.itemGroup = this.add.group();
    for (
      var l = 1;
      l <
      this.gameOptions.columns *
        this.gameOptions.rows *
        this.gameOptions.colors.length;
      l++
    ) {
      this.stars[l] = -1;
    }
    this.scrollingMap = this.add.tileSprite(
      0,
      0,
      this.gameOptions.colors.length * width,
      height,
      'transp'
    );
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.scrollingMap.setOrigin(0, 0);
    this.currentPage = 0;
    this.pageSelectors = [];
    var rowLength =
      this.gameOptions.thumbWidth * this.gameOptions.columns +
      this.gameOptions.spacing * (this.gameOptions.columns - 1);
    var leftMargin = (width - rowLength) / 2 + this.gameOptions.thumbWidth / 2;
    var colHeight =
      this.gameOptions.thumbHeight * this.gameOptions.rows +
      this.gameOptions.spacing * (this.gameOptions.rows - 1);
    var topMargin = (height - colHeight) / 2 + this.gameOptions.thumbHeight / 2;

    for (var k = 0; k < this.gameOptions.colors.length; k++) {
      for (var i = 0; i < this.coordenadas.length; i++) {
        this.thumb = this.add.image(
          this.coordenadas[i].x,
          this.coordenadas[i].y,
          'levelthumb'
        );
        this.thumb.setTint(this.gameOptions.colors[k]);
        this.thumb['levelNumber'] = i;
        this.thumb['levelNumber'];
        this.thumb.setFrame(
          parseInt(this.stars[this.thumb['levelNumber']]) + 1
        );
        this.thumb.setInteractive();
        this.itemGroup.add(this.thumb);
        var levelText = this.add.text(
          this.thumb.x,
          this.thumb.y - 12,
          this.thumb['levelNumber'] + 1,
          {
            font: '24px Arial',
            color: '#000000',
          }
        );
        levelText.setOrigin(0.5);
        this.itemGroup.add(levelText).setDepth(5);
      }
      this.pageSelectors[k] = this.add.sprite(
        width / 2 +
          (k -
            Math.floor(this.gameOptions.colors.length / 2) +
            0.5 * (1 - (this.gameOptions.colors.length % 2))) *
            40,
        height - 40,
        'levelpages'
      );
      this.pageSelectors[k].setInteractive();
      this.pageSelectors[k].on('pointerdown', function () {
        if (this.scene.canMove) {
          var difference = this.pageIndex - this.scene.currentPage;
          this.scene.changePage(difference);
          this.scene.canMove = false;
        }
      });
      this.pageSelectors[k].pageIndex = k;
      this.pageSelectors[k].tint = this.gameOptions.colors[k];
      if (k == this.currentPage) {
        this.pageSelectors[k].scaleY = 1;
      } else {
        this.pageSelectors[k].scaleY = 0.5;
      }
    }

    /// SECCION: PATH FOLLOWER

    var par: boolean = true;
    var conta = 0;
    var comienzoY = height / 2;
    var comienxoX = 0;
    var path = new Phaser.Curves.Path(comienxoX, comienzoY);
    for (let item of this.itemGroup.getChildren()) {
      if (par && conta < 16) {
        //console.log(item.x, item.y); // "Cat", "Dog", "Hamster"
        this.points.push({ x: item.x, y: item.y });
      }
      conta = conta + 1;
      par = !par;
    }
    path.splineTo(this.points);
    var graphics = this.add.graphics();

    graphics.lineStyle(10, 0x0000ff, 1);

    path.draw(graphics, 328).setDepth(1);

    this.character = this.add
      .follower(path, comienxoX, comienzoY, 'bot')
      .setDepth(10);
    this.character.startFollow({
      duration: 16000,
      yoyo: true,
      repeat: -1,
      rotateToPath: true,
    });
    //this.cameras.main.startFollow(this.character, true, 0.09, 0.09);
    this.character.play('run');
    //this.cameras.main.setZoom(1.5);
    console.log('puntos', this.points[0].x);

    for (var h = 0; h < this.points.length; h++) {
      if (h % 2 == 0) {
        new Phaser.Geom.Circle();
        this.circulos.push(
          new Phaser.Geom.Circle(this.points[h].x, this.points[h].y, 1.25)
        );
      } else {
        this.circulos.push(
          new Phaser.Geom.Circle(this.points[h].x, this.points[h].y, 1.25)
        );
      }
      graphics.fillCircleShape(this.circulos[h]);
      console.log('x', this.points[h].x, 'y', this.points[h].y);
    }

    /// SECCION: INPUTS EVENTOS

    this.input.on(
      'pointerdown',
      function (pointer, gameObject) {
        this.detenido = false;
        this.character.resumeFollow();
        this.canMove = true;
        this.itemGroup.children.iterate(function (item) {
          if (this.despliega) {
            this.menu1.destroy();
            this.menu2.destroy();
            this.menu3.destroy();
            this.rectangulo.destroy();
            this.plugins.get('rexScale').scaleDownDestroy(this.obj, 1000);
            this.obj = undefined;
            this.despliega = false;
          }
          //console.log("item", item.texture.key, despliega)
          if (item.texture.key == 'levelthumb') {
            var boundingBox = item.getBounds();
            if (
              Phaser.Geom.Rectangle.Contains(
                boundingBox,
                pointer.x,
                pointer.y
              ) &&
              item.frame.name > 0
            ) {
              //
              if (!this.despliega) {
                context.open();

                this.obj = this.add.group();
                this.rectangulo = this.add
                  .rectangle(pointer.x + 10, pointer.y - 10, 100, 140, 0x000000)
                  .setVisible(false)
                  .setOrigin(0);
                this.menu1 = this.add
                  .text(pointer.x + 20, pointer.y, 'Primero!', {
                    fill: '#ffffff',
                  })
                  .setInteractive()
                  .setVisible(false)
                  .on('pointerdown', () => console.log('Primera opcion'));
                this.menu2 = this.add
                  .text(pointer.x + 20, pointer.y + 50, 'Segundo!', {
                    fill: '#ffffff',
                  })
                  .setInteractive()
                  .setVisible(false)
                  .on('pointerdown', () => console.log('Segunda opcion'));
                this.menu3 = this.add
                  .text(pointer.x + 20, pointer.y + 100, 'Tercero!', {
                    fill: '#ffffff',
                  })
                  .setInteractive()
                  .setVisible(false)
                  .on('pointerdown', () => console.log('Tercera opcion'));
                //obj = this.add.image(pointer.x, pointer.y, "menu");
                this.obj.add(this.menu1);
                this.obj.add(this.menu2);
                this.obj.add(this.menu3);
                this.obj.add(this.rectangulo);
                this.plugins
                  .get('rexScale')
                  .popup(this.obj.setVisible(true), 1000)
                  .once('complete', function () {
                    this.despliega = true;
                  });
                //    this.scene.start("playLevel", {
                //     level: item.levelNumber,
                //     stars: this.stars
                // });
              }
              //
            }
          }
        }, this);
      },
      this
    );

    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.startPosition = gameObject.x;
      gameObject.currentPosition = gameObject.x;
    });

    this.input.on(
      'drag',
      function (pointer, gameObject, dragX, dragY) {
        if (dragX <= 10 && dragX >= -gameObject.width + width - 10) {
          gameObject.x = dragX;
          var delta = gameObject.x - gameObject.currentPosition;
          gameObject.currentPosition = dragX;
          //console.log("GAME", gameObject.width, width, dragX, delta)
          this.itemGroup.children.iterate(function (item) {
            item.x += delta;
          });
        }
      },
      this
    );

    this.input.on(
      'dragend',
      function (pointer, gameObject) {
        this.canMove = false;
        var delta = gameObject.startPosition - gameObject.x;
        if (delta == 0) {
          this.canMove = true;
          this.itemGroup.children.iterate(function (item) {
            if (item.texture.key == 'levelthumb') {
              var boundingBox = item.getBounds();
              if (
                Phaser.Geom.Rectangle.Contains(
                  boundingBox,
                  pointer.x,
                  pointer.y
                ) &&
                item.frame.name > 0
              ) {
                //
                //    this.scene.start("playLevel", {
                //     level: item.levelNumber,
                //     stars: this.stars
                // });
              }
              //
            }
          }, this);
        }
        if (delta > width / 8) {
          this.changePage(1);
        } else {
          if (delta < -width / 8) {
            this.changePage(-1);
          } else {
            this.changePage(0);
          }
        }
      },
      this
    );

    /// SCOREBOARD
    this.character.setDataEnabled();
    this.character.data.set('nombre', 'Gerardo Ponce');
    this.character.data.set('nivel', 0);
    this.character.data.set('xpos', this.character.x);
    this.character.data.set('ypos', this.character.y);

    this.scoreboard = this.add.text(width - 200, 0, '', {
      font: '14px Courier',
      color: '#00ff00',
    });

    this.scoreboard.setText([
      'Nombre:' + this.character.data.get('nombre'),
      'Nivel: ' + this.character.data.get('nivel'),
      'Pocision X: ' + this.character.data.get('xpos'),
      'Pocision y: ' + this.character.data.get('ypos'),
    ]);
    //funcion que sirve para actualizar los valores cuando cambian
    this.character.on('changedata-xpos', function () {});

    //BOTONES
    var el = document.createElement('button');
    el.innerHTML = 'PRUEBA';
    el.setAttribute('class', 'btn btn-secondary mr-2');
    el.setAttribute('type', 'button');

    var inputDom = document.createElement('input');
    //var domInput = this.add.dom(500, 200, inputDom);

    //var domElement = this.add.dom(200, 200, el);
    //domElement.addListener('click');
    // domElement.on('click', function () {
    //   console.log(inputDom.value);
    //   console.log(domInput);
    //   context.open();
    // });
  }

  actualizarScore() {
    this.scoreboard.setText([
      'Nombre: ' + this.character.data.get('nombre'),
      'Nivel: ' + this.character.data.get('nivel'),
      'Pocision X: ' + Math.floor(this.character.x),
      'Pocision y: ' + Math.floor(this.character.y),
    ]);
  }

  update() {
    this;
    this.actualizarScore();

    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[1],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[2],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[3],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[4],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[5],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[6],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[7],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }
    if (
      Phaser.Geom.Circle.ContainsPoint(
        this.circulos[8],
        this.character.getCenter()
      ) &&
      !this.detenido
    ) {
      this.character.pauseFollow();
      this.detenido = true;
      this.character.data.values.nivel++;
    }

    // console.log(this.character.x, this.character.y);

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.character.getBounds(),
        this.itemGroup.getFirstAlive().getBounds()
      )
    ) {
      //this.character.pauseFollow();
      //this.itemGroup.remove(this.itemGroup.getFirstAlive);
      //this.menuCrear(this.desplegado);
      // console.log('desplegado', this.desplegado);
    } else {
    }
  }

  menuCrear(desplegado) {
    if (!desplegado) {
      this.canMove = true;
      this.itemGroup.children.iterate(function (item) {
        //console.log("item", item.texture.key, despliega)
        var boundingBox = item.getBounds();
        if (
          Phaser.Geom.Rectangle.Contains(
            boundingBox,
            this.character.x,
            this.character.y
          ) &&
          item.frame.name > 0
        ) {
          //
          this.obj = this.add.group();
          this.rectangulo = this.add
            .rectangle(
              this.character.x + 10,
              this.character.y - 10,
              100,
              140,
              0x000000
            )
            .setVisible(false)
            .setOrigin(0);
          this.menu1 = this.add
            .text(this.character.x + 20, this.character.y, 'Primero!', {
              fill: '#ffffff',
            })
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => console.log('Primera opcion'));
          this.menu2 = this.add
            .text(this.character.x + 20, this.character.y + 50, 'Segundo!', {
              fill: '#ffffff',
            })
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => console.log('Segunda opcion'));
          this.menu3 = this.add
            .text(this.character.x + 20, this.character.y + 100, 'Tercero!', {
              fill: '#ffffff',
            })
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => console.log('Tercera opcion'));
          //obj = this.add.image(pointer.x, pointer.y, "menu");
          this.obj.add(this.menu1);
          this.obj.add(this.menu2);
          this.obj.add(this.menu3);
          this.obj.add(this.rectangulo);
          this.plugins
            .get('rexScale')
            .popup(this.obj.setVisible(true), 100)
            .once('complete', function () {
              this.desplegado = true;
              console.log('desplegado', this.desplegado);
            });
          //    this.scene.start("playLevel", {
          //     level: item.levelNumber,
          //     stars: this.stars
          // });
          //
        }
      }, this);
    }
  }

  menuDestruir() {
    this.menu1.destroy();
    this.menu2.destroy();
    this.menu3.destroy();
    this.rectangulo.destroy();
    this.obj = undefined;
    this.despliega = false;
  }

  changePage(page) {
    this.currentPage += page;
    for (var k = 0; k < this.gameOptions.colors.length; k++) {
      if (k == this.currentPage) {
        this.pageSelectors[k].scaleY = 1;
      } else {
        this.pageSelectors[k].scaleY = 0.5;
      }
    }
    //this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + this.gameOptions.colors.length + ")";
    var currentPosition = this.scrollingMap.x;
    this.tweens.add({
      targets: this.scrollingMap,
      x: this.currentPage * -this.sys.game.canvas.width,
      duration: 300,
      ease: 'Cubic.easeOut',
      callbackScope: this,
      onUpdate: function (tween, target) {
        var delta = target.x - currentPosition;
        currentPosition = target.x;
        this.itemGroup.children.iterate(function (item) {
          item.x += delta;
        });
      },
      onComplete: function () {
        this.canMove = true;
      },
    });
  }
}
