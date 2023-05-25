import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartState } from 'src/app/redux/state.model';
import { HeaderChangerService } from '../../services/header-changer.service';
import * as CartSelect from '../../../redux/selectors/cart.selector';

enum IconLinks {
  white = 'assets/basketWhite.svg',
  black = 'assets/basketBlack.svg',
}

@Component({
  selector: 'app-basket-indicator',
  templateUrl: './basket-indicator.component.html',
  styleUrls: ['./basket-indicator.component.scss'],
})
export class BasketIndicatorComponent implements OnInit, OnDestroy {

  public isBasketCounter: boolean = false;

  public basketCounter: number = 0;

  public basketIcon: IconLinks = IconLinks.white;

  private cart$: Observable<CartState>;

  private subscription: Subscription;

  constructor(
    private mainObserver: HeaderChangerService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe((data) => {
      const { bgColor } = data;
      this.onChange(bgColor);
    });
    this.cart$ = this.store.select(CartSelect.selectFlights);
    this.subscription = this.cart$.subscribe((data) => {
      if (data.flights.length !== 0) {
        this.isBasketCounter = true;
        this.basketCounter = data.flights.length;
      } else {
        this.isBasketCounter = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private onChange(bgColor: boolean): void {
    this.basketIcon = bgColor ? IconLinks.black : IconLinks.white;
  }

  public cartRoute(): void {
    this.router.navigateByUrl('/cart');
  }

}
