import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  public dates = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

  public date = 'MM/DD/YYYY';

  public textColor: Color = Color.white;

  constructor(private mainObserver: HeaderChangerService) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.onChange());
  }

  private onChange(): void {
    this.textColor = this.textColor === Color.white ? Color.black : Color.white;
  }

}
