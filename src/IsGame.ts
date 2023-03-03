import { GameOfDartsType } from "./Misc";
import Player from "./Player";

export default interface IsGame {
    type:GameOfDartsType;
    options:{numOfPlayers:{min:number,max:number}};
    players:Array<Player>;
    playerNumOk:any
    currentPlayerIndex:number;
    startGame():void;
    quit():void;
    addPlayer(name:string):void;
    currentPlayerAddPoints(p:string,a:number):void;
    nextPlayer():string;
}

