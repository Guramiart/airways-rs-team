import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DATE_FORMATS } from 'src/app/shared/enums/date-format';
import { Passengers } from 'src/app/airways/models/passengers';
import { PassengersType } from 'src/app/shared/enums/passengers-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';
import { DateValidator } from '../../modal-window/sign-in/validator';
import * as PassengerSelect from '../../../../redux/selectors/passenger.selector';
import * as SettingSelect from '../../../../redux/selectors/settings.selector';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss'],
})
export class PassengerFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isSubmitted : boolean;

  @Input() id : number;

  @Input() typeOfPassenger: PassengersType;

  @Output() passengerInfo = new EventEmitter<{ type:string, info:IPassengerInfo }>();

  @Output() errorEmit = new EventEmitter<{ id:number, type:string, error:boolean }>();

  public form: FormGroup;

  public gender = 'Male';

  public showMsg = false;

  public showMsg2 = false;

  public needHelp = false;

  private passengers$: Observable<Passengers>;

  private subsription: Subscription;

  private format$: Observable<string>;

  private subscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      birthDate: new FormControl<string>('', [Validators.required, DateValidator()]),
    });
    this.checkStore();
    this.format$ = this.store.select(SettingSelect.selectDateFormat);
    this.subscription = this.format$.subscribe((value) => {
      DATE_FORMATS.display.dateInput = value;
      this.updateDate();
    });
  }

  ngOnChanges(changes:SimpleChanges):void {
    const isSubmittedCurrent = changes['isSubmitted'].currentValue;
    const isSubmittedLast = changes['isSubmitted'].previousValue;
    if (isSubmittedCurrent !== isSubmittedLast && isSubmittedLast !== undefined) {
      this.submitForm();
    }
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
    this.subscription.unsubscribe();
  }

  private updateDate(): void {
    const date = this.form.get('birthDate').value;
    if (date !== null) {
      this.form.get('birthDate').setValue(new Date(date));
    }
  }

  private checkStore(): void {
    this.passengers$ = this.store.select(PassengerSelect.selectPassengers);
    this.subsription = this.passengers$.subscribe((passenger) => {
      const curPassenger = passenger.passengers[this.typeOfPassenger].info;
      if (curPassenger) {
        this.form.get('firstName').setValue(curPassenger[this.id].firstName);
        this.form.get('lastName').setValue(curPassenger[this.id].lastName);
        this.form.controls['birthDate'].setValue(new Date(curPassenger[this.id].birthDate));
        this.gender = curPassenger[this.id].gender;
      }
    });
  }

  public submitForm():void {
    this.form.markAllAsTouched();
    if (!this.form.invalid) {
      const newPassengerInfo = {
        firstName: this.replaceFirstLetterToUpperCase(this.form.controls['firstName'].value as string),
        lastName: this.replaceFirstLetterToUpperCase(this.form.controls['lastName'].value as string),
        birthDate: new Date(this.form.controls['birthDate'].value).toLocaleDateString(),
        gender: this.gender,
        needHelp: this.needHelp,
      };
      this.passengerInfo.emit({ type: this.typeOfPassenger, info: newPassengerInfo });
      this.errorEmit.emit({ id: this.id, type: this.typeOfPassenger, error: false });
    } else {
      this.errorEmit.emit({ id: this.id, type: this.typeOfPassenger, error: true });
    }
  }

  private replaceFirstLetterToUpperCase(str:string):string {
    const result = str[0].toUpperCase() + str.slice(1);
    return result;
  }

}
