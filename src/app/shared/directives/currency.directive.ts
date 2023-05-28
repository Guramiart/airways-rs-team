import {
  Directive, DoCheck, ElementRef, Input, Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Price } from 'src/app/services/flight.model';
import { Currency } from '../enums/currency';
import * as SelectSetting from '../../redux/selectors/settings.selector';

@Directive({
  selector: '[appCurrency]',
})
export class CurrencyDirective implements DoCheck {

  public currency$: Observable<Currency> = this.store.select(SelectSetting.selectCurrency);

  @Input() appCurrency: Price | undefined;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private store: Store,
  ) { }

  ngDoCheck(): void {
    this.renderer.setProperty(this.element.nativeElement, 'textContent', this.getCurrency());
  }

  private getCurrency(): string {
    let currency: string = '';
    this.currency$.subscribe((data) => {
      if (data === Currency.EUR) {
        currency = `€${this.appCurrency?.eur.toFixed(2)}`;
      }
      if (data === Currency.USD) {
        currency = `$${this.appCurrency?.usd.toFixed(2)}`;
      }
      if (data === Currency.RUB) {
        currency = `₽${this.appCurrency?.rub.toFixed(2)}`;
      }
      if (data === Currency.PLN) {
        currency = `zł${this.appCurrency?.pln.toFixed(2)}`;
      }
    });
    return currency;
  }

}
