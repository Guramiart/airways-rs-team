import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SettingsSelector from '../redux/selectors/settings.selector';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  private authUser: IUser | undefined;

  constructor(private router: Router, private store: Store) { }

  canActivate():
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // eslint-disable-no-store-subscription
    this.store.select(SettingsSelector.selectUser)
      .subscribe((data) => {
        this.authUser = data;
      });
    if (!this.authUser) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
