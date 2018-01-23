import {Good} from "./Good";
import {Evil} from "./Evil";
import {GroupItem} from "./GroupItem";

export class Being extends GroupItem {
    private willpower:number;
    private good:Good = new Good();
    private evil:Evil = new Evil();

    constructor() {
        super();

        this.add(this.good);
        this.add(this.evil);
    }

    public onRender():void {
        this.willpower = Math.random();
        this.evil.getContainer().alpha = this.willpower;
    }

    public influence(delta:number):void {
        this.willpower += delta;

        if(this.willpower > 100) {
            this.willpower = 100;
            return;
        }

        if(this.willpower < 1) {
            this.willpower = 1;
            return;
        }
    }
}