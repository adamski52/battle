import {Graphics} from "pixi.js";
import {CONFIG} from "./Config";

export class LifeBar {
    private shape:Graphics = new Graphics();
    private size:number;
    private color:number;

    constructor() {
        this.size = CONFIG.SIZE;
    }

    public render():void {
        this.shape.clear();

        this.shape.beginFill(this.color);
        this.shape.drawRect(0, 0, this.size, this.size);
        this.shape.endFill();
    }

    public getContainer():Graphics {
        return this.shape;
    }

    public setColor(color:number):void {
        this.color = color;
    }
}