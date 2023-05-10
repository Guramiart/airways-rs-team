import {
  Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../modal-window/sign-in/data';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit, OnChanges {

  @Input() isSubmitted : boolean;

  @Output() contactInfo = new EventEmitter<{ email:string;mobile:string; }>();

  @Output() errorEmit = new EventEmitter<{ id:number, type:string, error:boolean }>();

  public form: FormGroup;

  public countries = COUNTRIES;

  ngOnInit(): void {
    this.form = new FormGroup({
      countryCode: new FormControl<string>(''),
      mobile: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
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
      const newContactsInfo = {
        email: this.form.controls['email'].value,
        mobile: this.form.controls['countryCode'].value + this.form.controls['mobile'].value,
      };
      this.contactInfo.emit(newContactsInfo);
      this.errorEmit.emit({ id: 1, type: 'Contacts', error: false });
    } else {
      this.errorEmit.emit({ id: 1, type: 'Contacts', error: true });
    }
  }

}
