import {refreshParticipantsPanel} from './UI'
import {  Darts } from './GameOfDarts';
import { GameOfDartsType } from './Misc';
import {startMatchButton,quitGameButton, nextPlayerButton ,switchToPanel  } from './UI';
 


const addParticipantButton = document.querySelector("[data-btn='addParticipant']") as HTMLButtonElement;
 
 
export const darts = new Darts();
darts.pickAGame(GameOfDartsType.Cricket,{numOfPlayers:{min:2,max:4}})

 
darts.addPlayer('mike')
darts.addPlayer('josh')
darts.addPlayer('jake')
darts.addPlayer('will')
darts.startGame();

addParticipantButton.addEventListener('click',()=>{
    const input = addParticipantButton.previousElementSibling as HTMLInputElement;
    if(input.value!=''){
         darts.addPlayer(input.value)
         input.value='' 
    } 
})
 
startMatchButton.addEventListener('click',()=>{
    darts.startGame();
})
quitGameButton.addEventListener('click',()=>{
    darts.quitGame();
})
nextPlayerButton.addEventListener('click',()=>{
    darts.nextPlayer();
})

 

