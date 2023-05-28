import {
  Component, OnInit, Input, Output,
  OnChanges, SimpleChanges, EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '../../modal-window/sign-in/data';
import * as PassengersSelect from '../../../../redux/selectors/passenger.selector';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() isSubmitted : boolean;

  @Output() contactInfo = new EventEmitter<{ email:string;mobile:string;code:string }>();

  @Output() errorEmit = new EventEmitter<{ id:number, type:string, error:boolean }>();

  private passengers$: Observable<Passengers>;

  private subsription: Subscription;

  public form: FormGroup;

  public countries = COUNTRIES;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      countryCode: new FormControl<string>(''),
      mobile: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
    });
  }

  ngAfterContentInit(): void {
    this.checkStore();
  }

  ngOnChanges(changes:SimpleChanges):void {
    const isSubmittedCurrent = changes['isSubmitted'].currentValue;
    const isSubmittedLast = changes['isSubmitted'].previousValue;
    if (isSubmittedCurrent !== isSubmittedLast && isSubmittedLast !== undefined) {
      this.submitForm();
    }
  }

  private checkStore(): void {
    this.passengers$ = this.store.select(PassengersSelect.selectPassengers);
    this.subsription = this.passengers$.subscribe((passenger) => {
      if (passenger.contactDetails) {
        this.form.controls['email'].setValue(passenger.contactDetails.email);
        const code = this.countries.find((el) => passenger.contactDetails.code === el.code);
        this.form.get('countryCode').setValue(code.code, { emitEvent: true });
        this.form.controls['mobile'].setValue(passenger.contactDetails.mobile);
      }
    });
  }

  public submitForm():void {
    this.form.markAllAsTouched();
    if (!this.form.invalid) {
      const newContactsInfo = {
        email: this.form.controls['email'].value,
        code: this.form.controls['countryCode'].value,
        mobile: this.form.controls['mobile'].value,
      };
      this.contactInfo.emit(newContactsInfo);
      this.errorEmit.emit({ id: 1, type: 'Contacts', error: false });
      this.subsription.unsubscribe();
    } else {
      this.errorEmit.emit({ id: 1, type: 'Contacts', error: true });
    }
  }

}
