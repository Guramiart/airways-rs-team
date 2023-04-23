import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderChangerService } from '../../services/header-changer.service';

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

  public currency = 'EUR';

  public currencyArray = ['EUR', 'USA', 'RUB', 'PLN'];

  public textColor: Color = Color.white;

  constructor(private mainObserver: HeaderChangerService) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.onChange());
  }

  private onChange(): void {
    this.textColor = this.textColor === Color.white ? Color.black : Color.white;
  }

}
