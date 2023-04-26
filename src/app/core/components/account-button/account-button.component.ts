import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/services/user.model';
import { HeaderChangerService } from '../../services/header-changer.service';

import * as SettingsAction from '../../../redux/actions/settings.actions';
import * as SettingsSelector from '../../../redux/selectors/settings.selector';
import { DataService } from 'src/app/services/data.service';

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

  public authUser:IUser | undefined;

  public btnText = 'Sign In';

  public accountLogo = Icon.white;

  public textColor = Color.white;

  constructor(
    private mainObserver: HeaderChangerService,
    private store: Store,
    private data:DataService
  ) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.onChange());
    this.store.select(SettingsSelector.selectUser)
      .subscribe((data) => {
        this.authUser = data;
        this.authUser ? this.btnText = 'Sign Out' : this.btnText = 'Sign In';
      });

  }

  public openModal():void {
    if (this.authUser) {
      this.store.dispatch(SettingsAction.setAuthUser({ authUser: undefined }));
      this.data.changeLS(0,true)
    } else {
      this.store.dispatch(SettingsAction.openModal());
    }
  }

  private onChange(): void {
    this.accountLogo = this.accountLogo === Icon.white ? Icon.black : Icon.white;
    this.textColor = this.textColor === Color.white ? Color.black : Color.white;
  }

}
