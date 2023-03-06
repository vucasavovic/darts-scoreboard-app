export default class Panel{
    element:HTMLElement
    selector:string;

    constructor(selector:string){
        this.selector = selector;
        this.element = document.querySelector(selector) as HTMLElement;
    }

    display(active:boolean){
        active==true ? this.element.classList.add('active') : this.element.classList.remove('active');
    }
}

