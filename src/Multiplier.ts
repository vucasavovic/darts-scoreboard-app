import Panel from "./Panel";

class Multiplier extends Panel{
    
    number:number = 1;
    multiplierBtns:Array<HTMLElement>;
    callback!:(val:number) => void  ;
    constructor(){
        super('#multiplier')
        this.multiplierBtns = Array.from(this.element.querySelectorAll('[data-btn]'));
         this.multiplierBtns.forEach(btn => {
            btn.addEventListener('click',()=>{
                const multiplyVal = Number(btn.getAttribute('data-btn'));
                this.callback(multiplyVal)
                this.hide();
            })
         });
    }

    show(number:number,callback:(val:number) => void ){
        this.display(true)
        this.callback=callback;
        this.number = number;
    }
    hide(){
        this.display(false)
        this.callback = ()=>{};
        this.number = 0;
    }

    private multiply(multiplier:number):number{
      
        return  this.number * multiplier;
    }
 
}

const multiplier = new Multiplier();

export default multiplier;