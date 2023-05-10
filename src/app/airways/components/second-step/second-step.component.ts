import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Passengers } from '../../models/passengers';
import { IPassengerInfo } from '../../models/passengerInfo.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as FlightActions from '../../../redux/actions/flight.actions';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent implements OnInit, OnDestroy {

  public passengers:Passengers | null;

  public newPassenger:Passengers | null;

  public isSubmitted = false;

  private subscription: Subscription;

  private adultInfo:IPassengerInfo[] = [];

  private childInfo:IPassengerInfo[] = [];

  private infantInfo:IPassengerInfo[] = [];

  private errors:{ [key:string]:boolean } = {};

  private allChecksPass = false;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select(FlightSelect.selectFlight)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((data) => { this.passengers = data.passengers; });
  }

  public back(isBack:boolean):void {
    if (isBack) {
      this.router.navigateByUrl('/');
    } else {
      this.isSubmitted = !this.isSubmitted;
      setTimeout(() => {
        if (this.allChecksPass) {
          this.addPassengerInfoToStore();
          this.router.navigateByUrl('step/3');
        }
      }, 300);

    }
  }

  public getError(errorData:{ id:number, type:string, error:boolean }) {
    this.errors[errorData.type + errorData.id] = errorData.error;
    if (this.checkErrors()) {
      this.allChecksPass = true;
    }
  }

  public getContactInfo(data:{ email:string, mobile:string }) {
    if (this.passengers) {
      this.newPassenger = {
        ...this.passengers,
        contactDetails: data,
      };
      // this.passengers.contactDetails = data
    }
  }

  public getPassengerInfo(data:{ type:string, info:IPassengerInfo }):void {
    switch (data.type) {
      case 'adult': this.adultInfo = [];
        this.adultInfo.push(data.info);
        break;
      case 'child': this.childInfo = [];
        this.childInfo.push(data.info);
        break;
      case 'infant': this.infantInfo = [];
        this.infantInfo.push(data.info);
        break;
      default: break;
    }
  }

  private checkErrors():boolean {
    let check = true;
    const keysArr = Object.keys(this.errors);
    keysArr.forEach((key) => {
      if (this.errors[key] === true) {
        check = false;
      }
    });
    return check;
  }

  private addPassengerInfoToStore() {
    if (this.newPassenger) {
      const newObj = {
        ...this.newPassenger,
        passengers: {
          ...this.newPassenger.passengers,
          adult: {
            ...this.newPassenger.passengers.adult,
            info: this.adultInfo,
          },
          child: {
            ...this.newPassenger.passengers.child,
            info: this.childInfo,
          },
          infant: {
            ...this.newPassenger.passengers.infant,
            info: this.infantInfo,
          },
        },
      };
      this.store.dispatch(FlightActions.updatePassengers({ passengers: newObj }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
