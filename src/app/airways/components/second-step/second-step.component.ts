import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { FlightState } from 'src/app/redux/state.model';
import { Passengers } from '../../models/passengers';
import { Router } from '@angular/router';
import { IPassengerInfo } from '../../models/passengerInfo.model';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent implements OnInit, OnDestroy{
  public passengers:Passengers|null

  public isSubmitted = false

  private subscription: Subscription

  private adultInfo:IPassengerInfo[] = []

  private childInfo:IPassengerInfo[] = []

  private infantInfo:IPassengerInfo[] = []

  private errors:{[key:string]:boolean} = {}

constructor( private store: Store,
            private router: Router){}

ngOnInit(): void {
  this.subscription = this.store.select(FlightSelect.selectFlight)
  .subscribe(data=> this.passengers = data.passengers)
}

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

public back(isBack:boolean):void{
  if(isBack){
    this.router.navigateByUrl('/'); 
  }else{
    this.isSubmitted = !this.isSubmitted
   
    // this.router.navigateByUrl('step/3'); 
  }
}

public getError(errorData:{id:number, type:string, error:boolean}){
  this.errors[errorData.type+errorData.id] = errorData.error
  if(this.checkErrors()){
    console.log('da');
  }
}

public getPassengerInfo(data:{id:number,type:string, info:IPassengerInfo}):void{
  console.log(data);
  switch (data.type ){
    case "adult" :  this.adultInfo.push(data.info);
                    break;
    case "child" : this.childInfo.push(data.info);
                    break;
    case "infant" : this.infantInfo.push(data.info);
                    break;
  }
  console.log(this.adultInfo);
}

private checkErrors():boolean{
 
    let check = true
    for(let key in this.errors){
      console.log("key"+key);
      if(this.errors[key] === true){
        check = false
      }
    }
    return check

}

private addPassengerInfo(){
   
}

}
