import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SettingsSelector from '../../../redux/selectors/settings.selector';
import * as SettingsAction from '../../../redux/actions/settings.actions';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {

  public isModalOpen:boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(SettingsSelector.getModal)
      .subscribe((data) => {this.isModalOpen = data});
  }

  public closeModal():void {
    this.store.dispatch(SettingsAction.openModal());
  }

}
