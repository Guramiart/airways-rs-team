import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateFormat } from 'src/app/shared/enums/date-format';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

import * as SettingsSelector from '../../../redux/selectors/settings.selector';
import * as SettingsAction from '../../../redux/actions/settings.actions';

import { HeaderChangerService } from '../../services/header-changer.service';

enum Color {
  white = '#FFFFFF',
  black = '#49454F',
}

@Component({
  selector: 'app-date-choose',
  templateUrl: './date-choose.component.html',
  styleUrls: ['./date-choose.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DateChooseComponent implements OnInit {

  public dates = Object.values(DateFormat);

  public date$: Observable<DateFormat> | undefined;

  public textColor: Color = Color.white;

  constructor(
    private mainObserver: HeaderChangerService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.date$ = this.store.select(SettingsSelector.selectDateFormat);
    this.mainObserver.onChangePage().subscribe((data) => {
      const { bgColor } = data;
      this.onChange(bgColor);
    });
  }

  private onChange(bgColor: boolean): void {
    this.textColor = bgColor ? Color.black : Color.white;
  }

  public updateStore(value: MatSelectChange) {
    this.store.dispatch(SettingsAction.changeDate({
      dateFormat: Object.values(DateFormat).filter((el) => el === value.value)[0],
    }));
  }

}
