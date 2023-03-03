import CricketCutThroat from "./CricketCutThroat";
import IsGame from "./IsGame";
import { GameOfDartsType } from "./Misc";
import Player from "./Player";
import {  emptyParticipantsPanel, refreshParticipantsPanel,deleteParticipantScoreColumns,highlightScoreColumn,spawnScoreColumns,switchToPanel  } from "./UI";


export class  Darts{
     game?:IsGame;
     playerAdded:CustomEvent = new CustomEvent ('playerAdded');
 
     constructor(){
 
        
     }
     pickAGame(gameType:GameOfDartsType,options:{numOfPlayers:{min:number,max:number}}){
        switch (gameType) {
            case GameOfDartsType.Cricket:
                this.game as CricketCutThroat
                this.game = new CricketCutThroat(gameType,options) as CricketCutThroat;
                console.log(`A Cricket game created!`)
            break;
        
            default:
                break;
        }
     }

    startGame(){
        if(this.game?.playerNumOk){
            this.game?.startGame();
            spawnScoreColumns(this.game!.players)
            switchToPanel('score-board');
            this.nextPlayer();
        } 
    }

    quitGame(){
        this.game!.quit();
        deleteParticipantScoreColumns();
        emptyParticipantsPanel();
        switchToPanel('lobby');
    }

    nextPlayer(){
        const playerName = this.game?.nextPlayer();
        highlightScoreColumn(playerName!)
    }

    addPlayer(name:string){
        const players = this.game!.addPlayer(name);
        refreshParticipantsPanel(players!)
        
    }
    currentPlayerAddPoints(pointName:string,amount:number){
        this.game?.currentPlayerAddPoints(pointName,amount);
    }

    setActivePlayerPoint(){
        console.log('Plus')
    }
     
     
}


 


 
