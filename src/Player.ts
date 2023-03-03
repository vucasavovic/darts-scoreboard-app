

export default class Player{
    name:string='';
    points:Array<CricketPoint> = [ new CricketPoint('20',20),
                                   new CricketPoint('19',19),
                                   new CricketPoint('18',18), 
                                   new CricketPoint('17',17),  
                                   new CricketPoint('16',16), 
                                   new CricketPoint('15',15), 
                                   new CricketPoint('bull',25)]
    score:number=0;

    constructor(name:string){
        this.name=name; 
    }

    addStrike(pointName:string,amount:number){
        const point = this.points.filter(p=>p.name==pointName)[0];
        if(point){
            const newPoints =  point.addStrike(amount)
            this.score+=newPoints;
            console.log('Name: ' + point.name,'Strike: ' + point.strike, 'Score:' + this.score);
        }
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


class CricketPoint extends Point{
    strike:number=0
    maxStrikes:number = 3;
    closed:boolean = false;
    constructor(name:string,val:number){
        super(name ,val)
    }


    addStrike(amount:number):number{
        if(this.closed){
            return amount * this.val;
        }else{
            const remainder = this.strike + amount - this.maxStrikes;
            this.strike += amount;
            
            if(this.strike>=this.maxStrikes){
                this.closed=true;
            }
            return 0
        }  
    }
 
}