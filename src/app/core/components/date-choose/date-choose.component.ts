import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-date-choose',
  templateUrl: './date-choose.component.html',
  styleUrls: ['./date-choose.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DateChooseComponent {

  public dates = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

  public date = 'MM/DD/YYYY';

}
