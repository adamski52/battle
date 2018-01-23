import {Container} from "pixi.js";
import {BasicItem} from "./BasicItem";

export class GroupItem {
    private container:Container = new Container();
    private items:(BasicItem|GroupItem)[] = [];

    protected x:number;
    protected y:number;

    public getContainer():Container {
        return this.container;
    }

    public add(element:GroupItem|BasicItem):void {
        this.items.push(element);
        this.getContainer().addChild(element.getContainer());
    }

    public setPosition(x:number, y:number):void {
        this.x = x;
        this.y = y;
    }

    protected onRender():void {}

    public render():void {
        this.getContainer().x = this.x;
        this.getContainer().y = this.y;

        this.items.forEach((item:BasicItem|GroupItem) => {
            item.render();
        });

        this.onRender();
    }
}