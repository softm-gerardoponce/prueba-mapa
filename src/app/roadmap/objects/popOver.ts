import { ThisReceiver } from "@angular/compiler";
import { GameObjects } from "phaser";

export class PopOver extends Phaser.GameObjects.DOMElement {
    private _scene;
    private variable:string = "default";

    private template:string = `
        <div class="col-6">
            <img src="/assets/points.png" class="image"/>
            <label class="gui-info"><VAR1></label>
        </div><VAR1>
    `;

    constructor(scene, x:number, y:number){
        super(scene, x, y)
        this._scene = scene;
        this.createFromHTML(null);
    }

    show(value:string, x:number, y:number){
        let template = this.template;
        template = template.replace("<VAR1>", value)
        this.createFromHTML(template);
        this.setX(x);
        this.setY(y);        
    }

    hide(){
        this.createFromHTML(null);
    }

}