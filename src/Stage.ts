import {Application} from "pixi.js";
import {Being} from "./Being";
import {GroupItem} from "./GroupItem";
import {Ticker} from "pixi.js/lib";
import {CONFIG} from "./Config";

export class Stage {
    private app:Application = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: false,
        transparent: false,
        resolution: 1
    });

    private beings:Being[][];

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

        this.beings = [];
        for (let x = 0; x < window.innerWidth/CONFIG.SIZE; x++) {
            this.beings[x] = [];
            for(let y = 0; y < window.innerHeight/CONFIG.SIZE; y++) {
                let being: Being = new Being();
                being.setPosition(x * CONFIG.SIZE, y * CONFIG.SIZE);
                this.add(being);
                this.beings[x] = this.beings[x] || [];
                this.beings[x][y] = being;
            }
        }
    }

    private setupApp():void {
        this.app.renderer.view.style.position = "absolute";
        this.app.renderer.view.style.display = "block";
        this.app.renderer.autoResize = true;
        this.app.renderer.backgroundColor = CONFIG.NEUTRAL_COLOR;
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
        this.fight();
        this.render();
    }

    private render():void {
        for(let x = 0; x < this.beings.length; x++) {
            for(let y = 0; y < this.beings[x].length; y++) {
                this.beings[x][y].render();
            }
        }
        this.app.renderer.render(this.app.stage);
    }

    private fight():void {
        for(let x = 0; x < this.beings.length; x++) {
            for(let y = 0; y < this.beings[x].length; y++) {
                if(x < this.beings.length - 1) {
                    this.beings[x][y].fight(this.beings[x + 1][y]);
                }

                if(y < this.beings[x].length - 1) {
                    this.beings[x][y].fight(this.beings[x][y + 1]);
                }
            }
        }
    }

    public add(element:GroupItem):void {
        this.app.stage.addChild(element.getContainer());
    }

    public getElement():HTMLCanvasElement {
        return this.app.view;
    }
}