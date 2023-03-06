import { darts } from "./index";
import Player  from "./Player";
import { CricketPoint } from "./ScoreBoard";
 

class UIController {
      pointsBtns:Array<HTMLElement> = Array.from(document.querySelector('[data-ui-score-column=main]')!.querySelectorAll('[pt-val]'));
      
      constructor(){
        this.addPtsClickEvent()
      }

 
      setActivePlayer(playerName:string){
        this.highlightScoreColumn(playerName);
        const activePlayerInfo = document.querySelector('#activePlayer') as HTMLElement;
        activePlayerInfo!.textContent = playerName;
      }

      highlightScoreColumn(name:string){
        for(var col  of participantScoreColAll){
            if(col.getAttribute('data-ui-score-participant-column')==name){
              activateElement(col,true)
            }else{
              activateElement(col,false)
            }
        }
      }

      updateScoreTable(scores:Array<any>){
        const scoresElement = document.querySelector<HTMLElement>('[data-ui-scores]') as HTMLElement;
        for(var score of scores){
          let scoreColumnUI = scoresElement.querySelector(`[data-ui-score-participant-column=${score.id}]`) as HTMLElement;
          scoreColumnUI.lastElementChild!.textContent = score.score + ' pts';
        }
      }

      setThrowsUI(throws:number){
        const throwsParent = document.querySelector('[data-player-throws]') as HTMLElement;
        if(throws==0){
          for(var child of Array.from(throwsParent.children) as Array<HTMLElement>){
            activateElement(child,false)
          }
        }else{
          for(var i=0;i<throws;i++){
            activateElement(throwsParent.children[i] as HTMLElement,true)
          }
        }
      }

      addPtsClickEvent(){
        this.pointsBtns.forEach(f=>{
          f.addEventListener('click',(e:Event)=>{
            if (e.target instanceof Element){
                const pointName = e.target!.getAttribute('pt-val');
                darts.currentPlayerHit(pointName! , 1)
            }
          })
        })
      }

      displaySinglePanel(name:string){
        const uiPanels = Array.from(document.querySelectorAll('[data-ui-panel]')) as Array<HTMLElement>;
        for(var panel of  uiPanels){
          activateElement(panel as HTMLElement,panel.getAttribute('data-ui-panel')===name)
        }
      }
 
      displayPanel(name:string,visible:boolean){
         const panel = document.querySelector (`[data-ui-panel=${name}`) as HTMLElement;
         activateElement(panel,visible);
      }

      reset(){
        this.resetScoresUI();
        this.clearLobby();
      }

      resetScoresUI(){
        const scores = document.querySelector<HTMLElement>('[data-ui-scores]');
        for(var col of Array.from(scores!.children)){
          if(col.getAttribute('data-ui-score-participant-column')){
            col.remove();
            console.log('Clearing score board!')
          }
        }
      }
      refreshLobby(players:Array<Player>){
        this.clearLobby();
        for(var player of players){
         let newParticipantUI = participantElement.cloneNode(true) as HTMLElement;
         participantsParent?.insertBefore(newParticipantUI,participantsParent.children[participantsParent.children.length-1])
         newParticipantUI.children[0].innerHTML = player.name;
         newParticipantUI.setAttribute('data-participant',player.name);
         newParticipantUI.children[1].addEventListener('click',()=>{
            darts.removePlayer(newParticipantUI.getAttribute('data-participant')!);
         })
       }
     }

      clearLobby(){
        const  participants = document.querySelector('[data-participants]') as HTMLElement;
        Array.from(participants!.children).forEach(participant => {
          if(participant.getAttribute('data-participant')){
            participant.remove();
          }
        });
      }
      

      
   
}
export const UI = new UIController();
 
const missedbtn = document.querySelector('[data-btn=missed]') as HTMLElement;
missedbtn.addEventListener('click',()=>{
  darts.miss();
})


const addParticipantButton = document.querySelector("[data-btn='addParticipant']") as HTMLButtonElement;
addParticipantButton.addEventListener('click',()=>{
  const input = addParticipantButton.previousElementSibling as HTMLInputElement;
  if(input.value!=''){
       darts.addPlayer(input.value)
       input.value='' 
  } 
})

 
 


export const startMatchButton = document.querySelector('[data-btn=startMatch]') as HTMLButtonElement;
export const quitGameButton = document.querySelector('[data-btn=quitGame]') as HTMLButtonElement;
export const nextPlayerButton = document.querySelector('[data-btn=nextPlayer]') as HTMLButtonElement;
const  uiScores = document.querySelector('[data-ui-scores]');
 

const uiPanels = document.querySelectorAll('[data-ui-panel]');
const menuButton = document.querySelector('[data-btn=pause-menu]')
 
startMatchButton.addEventListener('click',()=>{
    darts.startGame();
})
quitGameButton.addEventListener('click',()=>{
    darts.quitGame();
})
nextPlayerButton.addEventListener('click',()=>{
    darts.nextPlayer();
})
 

//lobby participants
const participantElement = document.querySelector('[data-participant]') as HTMLElement;
const participantsParent = participantElement.parentElement;
participantElement.remove();
 

 

///score participant columns
const participantScoreCol = document.querySelector('[data-ui-score-participant-column]') as HTMLElement;
const participantScores = participantScoreCol.parentElement;
participantScoreCol.remove();

const participantScoreColAll:Array<HTMLElement> = [];

 

export function spawnScoreColumns(participants:Array<Player>){
  let side = 1;
  participants.forEach(p => {
    const clone = participantScoreCol.cloneNode(true) as HTMLElement;
    clone.firstElementChild!.innerHTML = p.name;
    clone.setAttribute('data-ui-score-participant-column',p.name)
    if(side%2>0){
      console.log('left');
      participantScores?.prepend(clone)
    }else{
      participantScores?.appendChild(clone)
      console.log('right');
    }
    participantScoreColAll.push(clone);
   
    side++;
 
  })
  
}
export function deleteParticipantScoreColumns( ){
    for(var col of Array.from(participantScores!.children)){
      if(col.getAttribute('data-ui-score-participant-column')){
        col.remove();
        console.log('Clearing score board!')
      }
    }
  
}

 
const closePauseMenuBtn = document.querySelector('[data-btn=closePauseMenu]') as HTMLButtonElement;
closePauseMenuBtn.addEventListener('click',()=>{
  switchToPanel('score-board')
})
 
menuButton?.addEventListener('click',()=>{
  switchToPanel('pause-menu')
})

export function quitGame(){
  switchToPanel('lobby')
}
 

export function switchToPanel(name:string){
  for(var panel of uiPanels){
      activateElement(panel as HTMLElement,panel.getAttribute('data-ui-panel')===name)
  }
}
 


function activateElement(element:HTMLElement,active:boolean){
  if(active){
    element?.classList.add('active')
  }
  else{
    element?.classList.remove('active')
  }
}