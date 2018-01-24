import {BasicItem} from "./BasicItem";
import {GroupItem} from "./GroupItem";
import {Utils} from "./Utils";
import {CONFIG} from "./Config";

export class Being extends GroupItem {
    private _life:BasicItem = new BasicItem();
    private _health:number = CONFIG.STARTING_HEALTH;
    private _isGood:boolean;

    constructor() {
        super();

        this.setTeam(Utils.getRandomBetween(0, 1) === 0);

        this.add(this._life);
    }

    public setTeam(isGood:boolean):void {
        this._isGood = isGood;
        this._life.setColor(this.getTeam() ? CONFIG.GOOD_COLOR : CONFIG.BAD_COLOR);
    }

    public getTeam():boolean {
        return this._isGood;
    }

    private setHealth(health:number):void {
        if(health <= CONFIG.MIN_HEALTH) {
            this.setTeam(!this.getTeam());
            health = CONFIG.MAX_HEALTH;
        }
        else if(health > CONFIG.MAX_HEALTH) {
            health = CONFIG.MAX_HEALTH;
        }

        this._health = health;
    }

    private getHealth():number {
        return this._health;
    }

    public fight(enemy:Being):void {
        // fights happen when teams are different.
        // not fighting restores heals.
        // the winner of a fight is whoever has the most health.
        // if both combatants have the same health, a loser is picked at random.
        // combatants lose a random amount of health, up to the loser's health.
        // when a combatant dies, it becomes the other type at full health.

        if(enemy.getTeam() === this.getTeam()) {
            this.heal();
            enemy.heal();
            return;
        }

        let enemyHealth:number = enemy.getHealth(),
            myHealth:number = this.getHealth(),
            loser:Being,
            damage:number;

        if(enemyHealth === myHealth) {
            loser = Utils.getRandomBetween(0, 1) === 0 ? this : enemy;
        }
        else if(enemyHealth > myHealth) {
            loser = this;
        }
        else {
            loser = enemy;
        }

        damage = Utils.getRandomBetween(1, loser.getHealth());

        enemy.setHealth(enemyHealth - damage);
        this.setHealth(myHealth - damage);
    }

    public heal():void {
        this.setHealth(this.getHealth() + CONFIG.HEALING_FACTOR);
    }

    public onRender():void {
        this._life.getContainer().alpha = this.getHealth() / 100;
    }
}