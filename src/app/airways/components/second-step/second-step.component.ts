import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Passengers } from '../../models/passengers';
import { IPassengerInfo } from '../../models/passengerInfo.model';
import * as PassengerSelect from '../../../redux/selectors/passenger.selector';
import * as PassengersActions from '../../../redux/actions/passengers.action';
import { StepperService } from '../../../core/services/stepper-service.service';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
})
export class SecondStepComponent implements OnInit, OnDestroy {

  public passengers: Passengers;

  public newPassenger: Passengers;

  public isSubmitted = false;

  private passengers$: Observable<Passengers>;

  private subscription: Subscription;

  private adultInfo:IPassengerInfo[] = [];

  private childInfo:IPassengerInfo[] = [];

  private infantInfo:IPassengerInfo[] = [];

  private errors:{ [key:string]:boolean } = {};

  private allChecksPass = false;

  constructor(
    private store: Store,
    private router: Router,
    private stepperSwitcher: StepperService,
  ) {}

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('second');
    this.passengers$ = this.store.select(PassengerSelect.selectPassengers);
    this.subscription = this.passengers$
      .subscribe((data) => { this.passengers = data; });
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
    }
  }

  public getPassengerInfo(data:{ type:string, info:IPassengerInfo }):void {
    switch (data.type) {
      case 'adult':
        this.adultInfo.push(data.info);
        break;
      case 'child':
        this.childInfo.push(data.info);
        break;
      case 'infant':
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
      this.store.dispatch(PassengersActions.updatePassengers({ passengers: newObj }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
