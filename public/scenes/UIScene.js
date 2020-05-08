import { CST } from "../CST.js";

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export class UIScene extends Phaser.Scene{
  constructor(){
    super(CST.SCENES.UI);
  }
  init(){
    
  }

  preload(){
    this.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });  
  }

  create(){
    var data = {
        name: 'Rex',
        skills: [
            { name: 'A' },
            { name: 'B' },
            { name: 'C' },
            { name: 'D' },
            { name: 'E' },
        ],
        items: [
            { name: 'A' },
            { name: 'B' },
            { name: 'C' },
            { name: 'D' },
            { name: 'E' },
            { name: 'F' },
            { name: 'G' },
            { name: 'H' },
            { name: 'I' },
            { name: 'J' },
            { name: 'K' },
            { name: 'L' },
            { name: 'M' },
            { name: 'N' },
        ],
        infos: [ 
            { name: 'chance de critique',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'B',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'C',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'D',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'E',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'F',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'G',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'H',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'I',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            },
            { name: 'J',
            description: 'cette statistique influe sur la probabilité de coup critique',
            value: '10'
            }
        ]
    };

    this.print = this.add.text(0, 0, '');
        var scrollablePanel = this.rexUI.add.scrollablePanel({
                x: this.game.renderer.width/2,
                y: this.game.renderer.height*0.9,
                width: this.game.renderer.width,
                height: 220,

                scrollMode: 0,

                background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

                panel: {
                    child: createPanel(this, data),

                    mask: {
                        padding: 1
                    },
                },
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,

                    panel: 10,
                }
            })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
        
        this.input.topOnly = false;
  }

  update(){

  }

  
}

var createPanel = function (scene, data) {
    var sizer = scene.rexUI.add.sizer({
            orientation: 'x',
        })
        .add(
            createHeader(scene, data), // child
            0, // proportion
            'top', // align
            {
                right: 5,
            }, // paddingConfig
            true // expand
        )
        .add(
            createTable(scene, data, 'skills', 1), // child
            0, // proportion
            'top', // align
            {
                right: 5,
            }, // paddingConfig
            true // expand
        )
        .add(
            createInfo(scene, data, 'infos'), // child
            1, // proportion
            'top', // align
            {
                right: 5,
            },
            0, // paddingConfig
            true // expand
        )
        .add(
            createTable(scene, data, 'items', 2), // child
            0, // proportion
            'top', // align
            0, // paddingConfig
            true // expand
        )
    return sizer;
}

var createHeader = function (scene, data) {
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, 'Character'),
    });
    var header = scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 5, COLOR_LIGHT),
        text: scene.add.text(0, 0, data.name),

        space: {
            icon: 10,
        }
    });

    return scene.rexUI.add.sizer({
            orientation: 'y',
        })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            0, // proportion
            'left', // align
            5, // paddingConfig
            true // expand
        )
        .add(header, // child
            1, // proportion
            'center', // align
            5, // paddingConfig
            true // expand
        );
};

var createInfo = function(scene, data, key) {

    var infos = data[key];
    console.log(infos.length);
    var info, r, c;
    var statSizer =  scene.rexUI.add.fixWidthSizer()
    .addBackground(
        scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
    )
        

    for (var i = 0, cnt = infos.length; i < cnt; i++) {
        info = infos[i];

        var titleStat = scene.rexUI.add.label({
            orientation: 'x',
            text: scene.add.text(0, 0, info.name+ ' ('),
        });
        var stats = scene.rexUI.add.label({
            orientation: 'x',
            text: scene.add.text(0, 0, info.value+')'),
        });
        var description = scene.rexUI.add.label({
            orientation: 'x',
            text: scene.add.text(0, 0, ' : '+info.description),
        });
        
        statSizer.add(
            titleStat, // child
            1, // proportion
            'left', // align
            0, // paddingConfig
            true // expand
        ).add(
            stats, // child
            1, // proportion
            'left', // align
            0, // paddingConfig
            true // expand
        ).add(
            description, // child
            1, // proportion
            'left', // align
            0, // paddingConfig
            true // expand
        ).addNewLine();; 
    }

    return statSizer;
}


var createTable = function (scene, data, key, rows) {
    var capKey = key.charAt(0).toUpperCase() + key.slice(1);
    var title = scene.rexUI.add.label({
        orientation: 'x',
        text: scene.add.text(0, 0, capKey),
    });

    var items = data[key];
    var columns = Math.ceil(items.length / rows);
    var table = scene.rexUI.add.gridSizer({
        column: columns,
        row: rows,
        rowProportions: 1,
    });

    var item, r, c;
    var iconSize = (rows === 1) ? 80 : 40;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        r = i % rows;
        c = (i - r) / rows;
        item.category = key;
        table.add(
            createIcon(scene, item, iconSize, iconSize),
            c,
            r,
            'top',
            2,
            true
        );
        delete item.category;
    }

    return scene.rexUI.add.sizer({
            orientation: 'y',
        })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined).setStrokeStyle(2, COLOR_LIGHT, 1)
        )
        .add(
            title, // child
            0, // proportion
            'left', // align
            5, // paddingConfig
            true // expand
        )
        .add(table, // child
            1, // proportion
            'center', // align
            5, // paddingConfig
            true // expand
        );
}

var createIcon = function (scene, item, iconWidth, iconHeight) {
    var label = scene.rexUI.add.label({
        orientation: 'y',
        icon: scene.rexUI.add.roundRectangle(0, 0, iconWidth, iconHeight, 5, COLOR_LIGHT),
        text: scene.add.text(0, 0, item.name),

        space: {
            icon: 10,
        }
    });

    let category = item.category;
    let name = item.name;
    label.getElement('icon')
        .setInteractive()
        .on('pointerdown', function () {
            if (!scene.rexUI.getTopmostSizer(this).isInTouching()) {
                return;
            }
            scene.print.text += `${category}:${name}\n`;
        });

    return label;
};