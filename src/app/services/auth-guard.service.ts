import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as SettingsSelector from '../redux/selectors/settings.selector';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  private authUser: IUser;

  private user$: Observable<IUser>;

  private subscription: Subscription;

  constructor(private router: Router, private store: Store) { }

  canActivate():
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.user$ = this.store.select(SettingsSelector.selectUser);
    this.subscription = this.user$.subscribe((data) => {
      this.authUser = data;
    });
    if (!this.authUser) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
