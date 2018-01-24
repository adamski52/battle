import {utils} from "pixi.js"; // TODO:  coerce to a new name

export class Utils {
    private static _colors:number[] = [];

    public static getRandomBetween(min:number = 1, max:number = 100):number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static getRandomColor():number {
        return utils.rgb2hex([
            Utils.getRandomBetween(0, 255),
            Utils.getRandomBetween(0, 255),
            Utils.getRandomBetween(0, 255)
        ]);
    }

    public static getTeamColor(team:number):number {
        if(Utils._colors.length > team) {
            return Utils._colors[team];
        }

        let color:number;
        do {
            color = Utils.getRandomColor();
        }
        while(Utils._colors.indexOf(color) > -1);

        Utils._colors.push(color);

        return color;
    }
}