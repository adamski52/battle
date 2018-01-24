import {LifeBar} from "./LifeBar";
import {GroupItem} from "./GroupItem";
import {Utils} from "./Utils";
import {CONFIG} from "./Config";

export class Being extends GroupItem {
    private _life:LifeBar = new LifeBar();
    private _teamNum:number;
    private _health:number = CONFIG.STARTING_HEALTH;

    constructor() {
        super();

        if(CONFIG.NUM_TEAMS < 2) {
            throw "stop it.";
        }

        this.setTeam(Utils.getRandomBetween(0, CONFIG.NUM_TEAMS-1));

        this.add(this._life);
    }

    public setTeam(teamNum:number):void {
        this._teamNum = teamNum;
        this._life.setColor(Utils.getTeamColor(this.getTeam()));
    }

    public getTeam():number {
        return this._teamNum;
    }

    private setHealth(health:number):void {
        if(health <= CONFIG.MIN_HEALTH) {
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
        // when a combatant dies, it becomes the victor's type at full health.

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

        enemyHealth -= damage;
        myHealth -= damage;

        if(enemyHealth <= 0) {
            enemy.setTeam(this.getTeam());
        } else if(myHealth <= 0) {
            this.setTeam(enemy.getTeam());
        }

        enemy.setHealth(enemyHealth);
        this.setHealth(myHealth);
    }

    public heal():void {
        this.setHealth(this.getHealth() + CONFIG.HEALING_FACTOR);
    }

    public onRender():void {
        this._life.getContainer().alpha = this.getHealth() / 100;
    }
}