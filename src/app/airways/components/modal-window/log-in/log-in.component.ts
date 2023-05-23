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
      const respObj = {
        email: this.logInForm.controls['email'].value,
        password: this.logInForm.controls['password'].value,
      };
      this.data.loginUser(respObj).subscribe({
        error: (err) => {
          if (err === 'Not Found') {
            this.isCorrectEmail = true;
          } else {
            this.isCorrectEmail = false;
          }
          if (err === 'Forbidden') {
            this.isCorrectPassword = true;
          } else {
            this.isCorrectPassword = false;
          }
        },
        next: (resp) => {
          this.data.getUserToken(resp.token).subscribe((user) => {
            this.store.dispatch(SettingsAction.setAuthUser({ authUser: user }));
            this.data.changeLS(resp.token);
            this.closeModal();
          });
        },
      });
    }
  }

  private closeModal():void {
    this.store.dispatch(SettingsAction.openModal());
  }

}
