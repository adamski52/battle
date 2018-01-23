import {Graphics} from "pixi.js";

export class BasicItem {
    private shape:Graphics = new Graphics();
    protected color:number = 0x000000;
    protected size:number = 10;

    public render():void {
        this.shape.clear();

        this.shape.beginFill(this.color);
        this.shape.drawRect(0, 0, this.size, this.size);
        this.shape.endFill();
    }

    public getContainer():Graphics {
        return this.shape;
    }
}