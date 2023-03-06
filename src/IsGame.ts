import { GameOfDartsType } from "./Misc";
import Player from "./Player";

export default interface IsGame {
    type:GameOfDartsType;
    options:{numOfPlayers:{min:number,max:number}};
    players:Array<Player>;
    playerNumOk:any
    currentPlayerIndex:number;
    currentPlayer:Player | null;
    startGame():void;
    quit():void;
    addPlayer(name:string):void;
 
    nextPlayer():string;
}

