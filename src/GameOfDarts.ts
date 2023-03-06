import IsGame from "./IsGame";
import { GameOfDartsType } from "./Misc";
import Player  from "./Player";
import { CricketPoint } from "./ScoreBoard";
import {spawnScoreColumns,switchToPanel  } from "./UI";
import {UI} from "./UI";
import ScoreBoard from "./ScoreBoard";
 import multiplier from "./Multiplier";

export class  Darts{
     game?:IsGame;
     players:Array<Player>=[];
     numOfPlayers:{min:number,max:number} =  {min:2,max:4}
     currentPlayerIndex:number = 0;
     currentPlayer!:Player | null;
     throw:number=0;
     gameState:GameState = GameState.INACTIVE
     scoreBoard:ScoreBoard= new ScoreBoard();
    
    currentPlayerHit(pointName:string,amount:number):void{
        if(this.isGameState(GameState.ACTIVE) && this.throw<3 && this.currentPlayer){
            this.throw++;
            multiplier.show(20,(multiplier)=>{
                this.scoreBoard.strike(this.currentPlayer!.name, pointName, multiplier,(scoreBoard:ScoreBoard)=>{
                    UI.setThrowsUI(this.throw);
                    this.gameOver()
                });
            })
 
        } 
   
    }

    miss( ){
 
        if(this.isGameState(GameState.ACTIVE) && this.throw<3 && this.currentPlayer){
            console.log('miss');
            this.throw++;
            this.scoreBoard.strike(this.currentPlayer!.name, '', 0,(scoreBoard:ScoreBoard)=>{
                UI.setThrowsUI(this.throw);
            });
 
        } 
    }
 
    nextPlayer():void{
        if(this.isGameState(GameState.ACTIVE)){
            if(!this.currentPlayer){
                this.throw = 0;
                this.setPlayer();
            }
            else if(this.throw==3){
                this.throw=0
                this.setPlayer()
                UI.setThrowsUI(this.throw);
            }
            else{
                console.log('Cannot switch player, must throw 3 times!');
            }
        } 
   
    }

    setPlayer():void{
        
        if(this.currentPlayerIndex>this.players.length-1) this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
        UI.setActivePlayer(this.currentPlayer.name)
        this.currentPlayerIndex ++
    }

    addPlayer(name:string):void{

        const uniqueName = this.players.find((p)=>p.name===name) ? false : true;

        if(this.players.length<this.numOfPlayers.max && uniqueName){
            this.players.push(new Player(name))
            UI.refreshLobby(this.players);
        }
    }

    removePlayer(name:string):void{
        console.log(name, ' needs to be removed');
        
       this.players =  this.players.filter(p => p.name != name);
       UI.refreshLobby(this.players);
    }
 
    startGame():void{
        if(this.isGameState(GameState.INACTIVE) && this.players.length<=this.numOfPlayers.max && this.players.length>=this.numOfPlayers.min){
            const names = this.players.map(p=>p.name);
            this.scoreBoard.populate(names)
            spawnScoreColumns(this.players)
            UI.displaySinglePanel('score-board');
            UI.displayPanel('info',true)
            this.nextPlayer();
            this.setGameState(GameState.ACTIVE)
        }
    }

    quitGame():void{
        window.location.href = '/';
    }
    pauseGame():void{
        UI.displaySinglePanel('pause-menu')
        this.setGameState(GameState.PAUSED)
    }

     
    gameOver(){
        if(this.scoreBoard.closedPoints.length==7){
            this.setGameState(GameState.INACTIVE)
            let sorted  = this.scoreBoard.scores.sort((a,b) => a.score > b.score ? 1 : -1)
            const winner=  sorted[0] ;
            
        }
    }

    setGameState(state:GameState){
        this.gameState = state;
        console.log(`current game state is ${this.gameState}`)
    }

    isGameState(state:GameState):boolean{
       return this.gameState==state ? true : false;
    }
     
}


enum GameState{
    ACTIVE='ACTIVE',
    PAUSED='PAUSED',
    INACTIVE="INACTIVE"
}

 


 
