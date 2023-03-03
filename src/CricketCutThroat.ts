import IsGame from "./IsGame";
import { GameOfDartsType } from "./Misc";
import Player from "./Player";
 
export default class CricketCutThroat implements IsGame{
    type:GameOfDartsType = GameOfDartsType.Unspecified;
    options:{numOfPlayers:{min:number,max:number}} = {numOfPlayers:{min:1,max:12}};
    players:Array<Player> = [];
    currentPlayerIndex:number = 0;
    currentPlayer!:Player | null;

    someCricketRelatedTing:string='Cricket is the best';
    
    public get playerNumOk() {
        if(this.players.length<this.options.numOfPlayers.min){
            console.log('Not enough players!');
            
            return false;
        }
        else if(this.players.length>this.options.numOfPlayers.max){
            console.log('Too much players!');
            return false;
        }
        else{
            return true;
        }
    }

    constructor(type:GameOfDartsType,options:{numOfPlayers:{min:number,max:number}}){
        this.type=type;
        this.options = options;
    }
    startGame(){
        console.log('Game Started');
    }
    quit(){
        this.players=[];
        this.currentPlayerIndex = 0;
        this.currentPlayer = null;
    };

    currentPlayerAddPoints(pointName:string,amount:number){
       this.currentPlayer?.addStrike(pointName,amount)
    }

    nextPlayer(): string {
        if(this.players.length>0){
            if(this.currentPlayerIndex>this.players.length-1) this.currentPlayerIndex=0
            this.currentPlayer = this.players[this.currentPlayerIndex];
            console.log(this.currentPlayer);
            this.currentPlayerIndex++
            return this.currentPlayer.name;
            
        }
        console.log("Can't set next player,no players in game!");
        return '';
    }

    addPlayer(name: string): Array<Player> {
        if(this.players.length<this.options.numOfPlayers.max && this.players.filter(p=>p.name===name).length==0){
            console.log("Player added!",this.players)
            const newPlayer = new Player(name);
            this.players.push(newPlayer);
        }  
        else if(this.players.filter(p=>p.name===name).length==0){
            console.log("Player not added!" )
        }  
        return this.players 
    }
    removePlayer(name:string){
       this.players =  this.players.filter(p=>p.name!=name);
       console.log("Player removed",this.players)
    }
   
}
  