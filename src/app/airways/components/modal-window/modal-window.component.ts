import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as SettingsSelector from '../../../redux/selectors/settings.selector';
import * as SettingsAction from '../../../redux/actions/settings.actions';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit, OnDestroy {

  public isModalOpen:boolean;

  private subscription: Subscription;

  private modal: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.modal = this.store.select(SettingsSelector.selectModal);
    this.subscription = this.modal
      .subscribe((data) => { this.isModalOpen = data; });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public closeModal():void {
    this.store.dispatch(SettingsAction.openModal());
  }

}
