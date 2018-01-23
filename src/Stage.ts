import {Application} from "pixi.js";
import {Being} from "./Being";
import {GroupItem} from "./GroupItem";
import {Ticker} from "pixi.js/lib";

export class Stage {
    private app:Application = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: false,
        transparent: true,
        resolution: 1
    });

    private beings:Being[] = [];

    constructor() {
        this.setupApp();
        this.setupBeings();
        this.setupTicker();
        this.setupGlobalEvents();

        this.app.ticker.start();
    }

    private setupGlobalEvents():void {
        window.addEventListener("resize", () => {
            // this.setupBeings();
        });
    }

    private setupBeings():void {
        this.clearAll();

        for(let y = 0; y < window.innerHeight; y+=10) {
            for (let x = 0; x < window.innerWidth; x+=10) {
                let being: Being = new Being();
                being.setPosition(x, y);
                this.add(being);
                this.beings.push(being);
            }
        }
    }

    private setupApp():void {
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }

    private setupTicker():void {
        this.app.ticker.add((delta) => {
            this.onTick(delta);
        });
    }

    private clearAll():void {
        this.app.stage.removeChildren();
        this.beings = [];
    }

    private onTick(delta:number) {
        if(!delta) {
            return;
        }

        this.beings.forEach((being:Being) => {
            being.render();
        });

        this.app.renderer.render(this.app.stage);
    }

    public add(element:GroupItem):void {
        this.app.stage.addChild(element.getContainer());
    }

    public getElement():HTMLCanvasElement {
        return this.app.view;
    }
}