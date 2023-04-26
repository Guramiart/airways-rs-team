import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';

import * as SettingsAction from '../../../../redux/actions/settings.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {

  public logInForm: FormGroup;

  public isSubmitted = false;

  public hide = true;

  public isCorrectEmail = false;

  public isCorrectPassword = false;

  constructor(
    private data:DataService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public submit() {
    this.isSubmitted = true;
    if (!this.logInForm.invalid) {
      this.data.getUserByName(this.logInForm.controls['email'].value)
        .subscribe((user) => {
          if (user.length > 0) {
            this.isCorrectEmail = false;
            if (user[0].password === this.logInForm.controls['password'].value) {
              this.isCorrectPassword = false;
              this.closeModal();
            } else {
              this.isCorrectPassword = true;
            }
          } else {
            this.isCorrectEmail = true;
          }
        });
    }
  }

  private closeModal():void {
    this.store.dispatch(SettingsAction.openModal());
  }

}
