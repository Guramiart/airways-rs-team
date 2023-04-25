import { Component, OnInit } from '@angular/core';
import { HeaderChangerService } from '../../services/header-changer.service';
import { Store } from '@ngrx/store';

import * as SettingsAction from '../../../redux/actions/settings.actions';

enum Color {
  white = '#FFFFFF',
  black = '#49454F',
}

enum Icon {
  white = 'assets/loginWhite.svg',
  black = 'assets/loginBlack.svg',
}

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss'],
})
export class AccountButtonComponent implements OnInit {

  public btnText = 'Sign In';

  public accountLogo = Icon.white;

  public textColor = Color.white;

  constructor(private mainObserver: HeaderChangerService,
              private store: Store,) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.onChange());
  }

  public openModal():void{
    this.store.dispatch(SettingsAction.openModal())
  }

  private onChange(): void {
    this.accountLogo = this.accountLogo === Icon.white ? Icon.black : Icon.white;
    this.textColor = this.textColor === Color.white ? Color.black : Color.white;
  }



}
