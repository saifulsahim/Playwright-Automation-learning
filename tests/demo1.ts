import { type Locator,type Page } from "@playwright/test";

 let message1 : string = 'hello'; 
 //message1 = 2;
 message1 = 'bye';
 console.log(message1);

 let age : number = 2;
 console.log(age); 
 let isActive : boolean = false;

 let numberArray : number[] = [1,2,3];
 let data : any = "this could be anything";
 data = 42;

function add(a:number,b:number): number
    {
        return a+b; 
    }
add(3,4);

let user : {name:string, age: number , location :string} = {name : "Bob", age: 34, location : "swandip"}
user.location = "test";

class CartPage {
    page : Page;
    cartProducts: Locator;
    checkout: Locator;
    constructor(page : any) {
        this.page = page;
        this.cartProducts = this.page.locator("div li").first();
        this.checkout = this.page.locator("text=Checkout");
    }
}