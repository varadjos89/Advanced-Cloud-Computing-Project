import { Component } from '@angular/core';

import { Toggle } from '../shared/class/toggle';

@Component({
  selector: 'app-headerstudent',
  templateUrl: './headerstudent.component.html',
  styleUrls: ['./headerstudent.component.scss']
})
export class HeaderstudentComponent {

  clearReceivedData:boolean = false;
  catLength:number = 0;
  cartData:any[] = [];
  isVisible:boolean = false;
  mobileNavVis:boolean = false;
  
  
  constructor( ) { 
    
  }

  //mobileNavToggle()
  mobileNavToggle():boolean{
    let widgetStatus:boolean = new Toggle(this.mobileNavVis).simpleToggle(this.mobileNavVis);
    return this.mobileNavVis = widgetStatus;
  }
  //cartToggle()
  cartToggle():void{
    this.catLength = this.cartData.length;
    if(this.catLength !== 0){
      let widgetStatus:boolean = new Toggle(this.isVisible).simpleToggle(this.isVisible);
      this.isVisible = widgetStatus;
    }else{
      this.isVisible = this.isVisible;
    }
  }
  //cartStatus() 
  cartStatus(status) { //Event from Cart component (child) emitted by clearCart()
    if(status == false){
      return;
    }else{
      this.isVisible = false;
      this.cartData = [];
      this.catLength = 0;
    }
  }

}
