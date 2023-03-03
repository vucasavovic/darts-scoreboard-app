import { darts } from "./index";
import Player from "./Player";
 

export const startMatchButton = document.querySelector('[data-btn=startMatch]') as HTMLButtonElement;
export const quitGameButton = document.querySelector('[data-btn=quitGame]') as HTMLButtonElement;
export const nextPlayerButton = document.querySelector('[data-btn=nextPlayer]') as HTMLButtonElement;
const  uiScores = document.querySelector('[data-ui-scores]');
 

const uiPanels = document.querySelectorAll('[data-ui-panel]');
const menuButton = document.querySelector('[data-btn=pause-menu]')


//lobby participants
const participantElement = document.querySelector('[data-participant]') as HTMLElement;
const participantsParent = participantElement.parentElement;
participantElement.remove();
 

 

///score participant columns
const participantScoreCol = document.querySelector('[data-ui-score-participant-column]') as HTMLElement;
const participantScores = participantScoreCol.parentElement;
participantScoreCol.remove();

const participantScoreColAll:Array<HTMLElement> = [];

export function highlightScoreColumn(name:string){
    for(var col  of participantScoreColAll){
        if(col.getAttribute('data-ui-score-participant-column')==name){
          activateElement(col,true)
        }else{
          activateElement(col,false)
        }
    }
}

export function spawnScoreColumns(participants:Array<Player>){
  let side = 1;
  participants.forEach(p => {
    const clone = participantScoreCol.cloneNode(true) as HTMLElement;
    clone.firstElementChild!.innerHTML = p.name;
    clone.setAttribute('data-ui-score-participant-column',p.name)
    if(side%2>0){
      console.log('left');
      participantScores?.appendChild(clone)
    }else{
      participantScores?.prepend(clone )
      console.log('right');
    }
    participantScoreColAll.push(clone);
    ///ad listeners to fields
    side++;

    const pointsFields = clone.querySelectorAll('[pt-val]');

    Array.from(pointsFields).forEach(f=>{
      f.addEventListener('click',(e:Event)=>{
          ///////////////set points here
          if (e.target instanceof Element) { 
            const pointName = e.target!.getAttribute('pt-val');
            darts.currentPlayerAddPoints(pointName || '' , 1)
             }
           
      })
    })

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

 
// const restartGameBtn = document.querySelector('[data-btn=restartGame]') as HTMLButtonElement;
// restartGameBtn.addEventListener('click',()=>{
//   /// restart game of darts
//   switchToPanel('score-board')
// })
 
menuButton?.addEventListener('click',()=>{
  switchToPanel('pause-menu')
})

export function quitGame(){
  switchToPanel('lobby')
}


export function refreshParticipantsPanel(participants:Array<any>){

  emptyParticipantsPanel( )
  
  for(var participant of participants){
    let newParticipantUI = participantElement.cloneNode(true) as HTMLElement;
    participantsParent?.insertBefore(newParticipantUI,participantsParent.children[1])
    newParticipantUI.children[0].innerHTML = participant.name;
  }  
}

export function emptyParticipantsPanel( ){
  Array.from(participantsParent!.children).forEach(child => {
    if(child.getAttribute('data-participant')==''){
        child.remove();
    }
});
}


export function switchToPanel(name:string){
  for(var panel of uiPanels){
      activateElement(panel as HTMLElement,panel.getAttribute('data-ui-panel')===name)
  }
}
 


function activateElement(element:HTMLElement,active:boolean){
  if(active){
    element.classList.add('active')
  }
  else{
    element.classList.remove('active')
  }
}