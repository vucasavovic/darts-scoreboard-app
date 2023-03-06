import multiplier from "./Multiplier";
export default class ScoreBoard{
   
    scores:Array<any> = []
    closedPoints:Array<any> = [];
    scoresParentUI:HTMLElement = document.querySelector('[data-ui-scores]') as HTMLElement;
    scoresColumnsUI:Array<HTMLElement> = [];
    pointsBtns:Array<HTMLElement> = Array.from(document.querySelector('[data-ui-score-column=main]')!.querySelectorAll('[pt-val]'));
      
    populate(names:Array<string>){
        for(var name of names){
            this.scores.push({
                id:name as string,
                points:[
                    new CricketPoint('20',20),
                    new CricketPoint('19',19),
                    new CricketPoint('18',18),
                    new CricketPoint('17',17),
                    new CricketPoint('16',16),
                    new CricketPoint('15',15),
                    new CricketPoint('bull',25)
                ],
                score:0 
            })
        }
       this.scoresParentUI = document.querySelector('[data-ui-scores]') as HTMLElement;
    }
    
   
    
    strike(playerName:string,pointName:string,multiplier:number,callback:(board:ScoreBoard)=>void){

            console.log(pointName)

            let playersPtCol = this.scores.find(s=>s.id==playerName) ;
            let playersPt = playersPtCol.points.find((p:CricketPoint)=>p.name==pointName) as CricketPoint;
            
            if(!playersPt){
                callback(this);
                return
            }
            
            const closedPt = this.closedPoints.find(p=>p.point==playersPt.name) ;
            if(closedPt){
                if(closedPt.closedBy==playerName){
                   this.assignPoints(playerName,playersPt.val * multiplier);
                }
            }else{
                 
                const pointsWon = playersPt.strike(multiplier);
                if(pointsWon!=0){
                    this.assignPoints(playerName,pointsWon);
                }
                if(playersPt.strikes==3){
                    this.closedPoints.push({point:playersPt.name,closedBy:playerName});
                    this.closeNumberUI(playersPt.name)
                }
                
            }
 
            this.updateUI(this.scores,playerName,playersPt)
            
            callback(this);
    }

    pointIsClosed(pointName:string){
         for(var closedPt of this.closedPoints){
            if(closedPt.name==pointName) return  true;
         }
         return false;
    }

    assignPoints(playerName:string,pts:number){
        for(var scoreCol of this.scores){
            if(scoreCol.id != playerName){
                scoreCol.score += pts
                console.log(scoreCol.score);
            }
        }
 
    }

    reset(){
        this.closedPoints = [];
        this.scores = [];
        for(var btnUI of this.pointsBtns)[
            btnUI.classList.remove('closed')
        ]
    }

    updateUI(scores:Array<any>,currentPlayerName:string,point:CricketPoint){
        const currentPlayerColumnUI = this.scoresParentUI.querySelector(`[data-ui-score-participant-column=${currentPlayerName}]`) as HTMLElement;
        const pointUI = currentPlayerColumnUI!.querySelector(`[pt-val='${point.name}']`) as HTMLElement;
         
        const strikeGraphic = pointUI?.firstElementChild as HTMLImageElement;
        strikeGraphic.src = `./images/strike-${point.strikes}.svg`

        for(var scoreCol of scores){
            const currentPlayerColumnUI = this.scoresParentUI.querySelector(`[data-ui-score-participant-column=${scoreCol.id}]`) as HTMLElement;
            const pointSumUI = currentPlayerColumnUI!.querySelector(`[data-player-pts]`) as HTMLElement;
            pointSumUI.innerText = scoreCol.score;
        }
    }

    closeNumberUI(numberName:string){
        const main  = this.scoresParentUI.querySelector(`[data-ui-score-column=main]`) as HTMLElement;
        const closed = main!.querySelector(`[pt-val='${numberName}']`) as HTMLElement;
        closed.classList.add('closed')
    }
    
}


class Point{
    name:string;
    val:number = 0
    constructor(name:string,val:number){
        this.name=name;
        this.val = val;
    }
}


export class CricketPoint extends Point{
    static maxStrikes:number = 3
    strikes:number = 0;
    constructor(name:string,val:number){
        super(name ,val)
    }
   strike(multiplier:number=1):number{
        let remainder = (this.strikes + multiplier) - CricketPoint.maxStrikes;
        this.strikes += multiplier;
        if(this.strikes>3)  this.strikes = 3;
        console.log('mtpl: ' + multiplier,'Strikes: ' + this.strikes,"remainder: " + remainder)

        if(remainder>0){
            return this.val * remainder;
        }
        return 0;
    }
 
}