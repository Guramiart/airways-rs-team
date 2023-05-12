import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Currency } from 'src/app/shared/enums/currency';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { HeaderChangerService } from '../../services/header-changer.service';

import * as SettingsSelector from '../../../redux/selectors/settings.selector';
import * as SettingsAction from '../../../redux/actions/settings.actions';

enum Color {
  white = '#FFFFFF',
  black = '#49454F',
}

@Component({
  selector: 'app-currency-choose',
  templateUrl: './currency-choose.component.html',
  styleUrls: ['./currency-choose.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CurrencyChooseComponent implements OnInit {

  public currency$: Observable<Currency> | undefined;

  public currencyArray = Object.values(Currency);

  public textColor: Color = Color.white;

  constructor(
    private mainObserver: HeaderChangerService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.currency$ = this.store.select(SettingsSelector.selectCurrency);
    this.mainObserver.onChangePage().subscribe((data) => {
      const { bgColor } = data;
      this.onChange(bgColor);
    });
  }

  private onChange(bgColor: boolean): void {
    this.textColor = bgColor ? Color.black : Color.white;
  }

  public updateStore(value: MatSelectChange) {
    this.store.dispatch(SettingsAction.changeCurrency({
      currency: Object.values(Currency).filter((el) => el === value.value)[0],
    }));
  }

}
