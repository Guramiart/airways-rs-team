import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/services/user.model';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
import { HeaderChangerService } from '../../services/header-changer.service';

import * as SettingsAction from '../../../redux/actions/settings.actions';
import * as SettingsSelector from '../../../redux/selectors/settings.selector';

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
export class AccountButtonComponent implements OnInit, OnDestroy {

  public authUser:IUser;

  public btnText = 'Sign In';

  public accountLogo = Icon.white;

  public textColor = Color.white;

  private subscription: Subscription;

  private user$: Observable<IUser>;

  constructor(
    private mainObserver: HeaderChangerService,
    private store: Store,
    private data:DataService,
  ) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe((data) => {
      const { bgColor } = data;
      this.onChange(bgColor);
    });
    this.user$ = this.store.select(SettingsSelector.selectUser);
    this.subscription = this.user$
      .subscribe((data) => {
        this.authUser = data;
        this.authUser ? this.btnText = `${this.authUser.firstName}  ${this.authUser.lastName} `
          : this.btnText = 'Sign In';
      });

  }

  public openModal():void {
    if (this.authUser) {
      // TODO go to userPage
    } else {
      this.store.dispatch(SettingsAction.openModal());
    }
  }

  public signOut():void {
    this.store.dispatch(SettingsAction.setAuthUser({ authUser: undefined }));
    this.data.changeLS('', true);
  }

  private onChange(bgColor: boolean): void {
    this.accountLogo = bgColor ? Icon.black : Icon.white;
    this.textColor = bgColor ? Color.black : Color.white;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
