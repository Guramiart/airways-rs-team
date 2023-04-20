import { Component } from '@angular/core';

@Component({
  selector: 'app-currency-choose',
  templateUrl: './currency-choose.component.html',
  styleUrls: ['./currency-choose.component.scss'],
})
export class CurrencyChooseComponent {

  public currency = 'EUR';

  public currencyArray = ['EUR', 'USA', 'RUB', 'PLN'];

}
