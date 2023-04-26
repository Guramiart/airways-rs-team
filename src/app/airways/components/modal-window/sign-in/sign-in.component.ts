import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { DateValidator } from './validator';
import { COUNTRIES } from './data';

import * as SettingsAction from '../../../../redux/actions/settings.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public countries = COUNTRIES;

  public signInForm: FormGroup;

  public isSubmitted = false;

  public hide = true;

  public gender = 'Male';

  constructor(
    private data:DataService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[@!$#?&-])(?=.*[a-z])(?=.*[A-Z]).{8,}/)]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      birthDate: new FormControl('', [Validators.required, DateValidator()]),
      countryCode: new FormControl(''),
      mobile: new FormControl('', [Validators.required]),
      citizen: new FormControl(''),
      agreement: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.signInForm.invalid) {
      const newUser = {
        id: Date.now(),
        firstName: this.signInForm.controls['firstName'].value,
        email: this.signInForm.controls['email'].value,
        password: this.signInForm.controls['password'].value,
        lastName: this.signInForm.controls['lastName'].value,
        birthDate: new Date(this.signInForm.controls['birthDate'].value).toLocaleDateString(),
        gender: this.gender,
        mobile: this.signInForm.controls['countryCode'].value + this.signInForm.controls['mobile'].value,
        citizen: this.signInForm.controls['citizen'].value,
      };

      this.store.dispatch(SettingsAction.setAuthUser({ authUser: newUser }));
      this.data.setNewUser(newUser);
      this.closeModal();
    }
  }

  private closeModal():void {
    this.store.dispatch(SettingsAction.openModal());
  }

}
