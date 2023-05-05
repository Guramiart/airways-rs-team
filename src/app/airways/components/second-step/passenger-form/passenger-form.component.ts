import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';
import { DateValidator } from '../../modal-window/sign-in/validator';

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss'],
})
export class PassengerFormComponent implements OnInit, OnChanges {

  @Input() isSubmitted : boolean;

  @Input() id : number;

  @Input() typeOfPassenger : string;

  @Output() passengerInfo = new EventEmitter<{ type:string, info:IPassengerInfo }>();

  @Output() errorEmit = new EventEmitter<{ id:number, type:string, error:boolean }>();

  public form: FormGroup;

  public gender = 'Male';

  public showMsg = false;

  public showMsg2 = false;

  public needHelp = false;

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
  }

  ngOnChanges(changes:SimpleChanges):void {
    const isSubmittedCurrent = changes['isSubmitted'].currentValue;
    const isSubmittedLast = changes['isSubmitted'].previousValue;
    if (isSubmittedCurrent !== isSubmittedLast && isSubmittedLast !== undefined) {
      this.submitForm();
    }
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
