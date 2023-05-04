import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { FlightState } from 'src/app/redux/state.model';
import { Passengers } from '../../models/passengers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent implements OnInit, OnDestroy{
  public passengers:Passengers|null

  private subscription: Subscription

constructor( private store: Store,
            private router: Router){}

ngOnInit(): void {
  this.subscription = this.store.select(FlightSelect.selectFlight)
  .subscribe(data=> this.passengers = data.passengers)
  console.log( this.passengers);

}

ngOnDestroy(): void {
  this.subscription.unsubscribe()
}

public back(isBack:boolean):void{
  if(isBack){
    this.router.navigateByUrl('/'); 
  }else{
    this.router.navigateByUrl('step/3'); 
  }
}

}
