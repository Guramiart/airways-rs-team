import {
  AfterViewInit, ChangeDetectorRef,
  Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Price } from 'src/app/services/flight.model';
import { CartFlight, CartState } from 'src/app/redux/state.model';
import { FormControl } from '@angular/forms';
import { SortOrder } from 'src/app/shared/enums/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableRecordComponent } from '../../../shared/components/table-record/table-record.component';
import { CartSwitcherService, SelectionTicketEvent } from '../../services/cart-switcher.service';
import { SortingService } from '../../services/sorting-service.service';
import { HeaderChangerService } from '../../../core/services/header-changer.service';
import * as CartSelect from '../../../redux/selectors/cart.selector';
import { addNewPrice } from '../../../redux/actions/cart.actions';

type Discount = {
  code: string,
  used: boolean,
  discount: number,
};

type StyleArrow = {
  up: number,
  down: number,
};

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShoppingCartPageComponent implements AfterViewInit, OnInit, OnDestroy {

  private flights$: Observable<CartState>;

  private flights: CartFlight[];

  private flightSubscription: Subscription;

  public promocode: Discount[] = [
    {
      code: 'rsschool',
      used: false,
      discount: 0.9,
    },
    {
      code: 'RedNecksCode',
      used: false,
      discount: 0.8,
    },
    {
      code: 'TeamMaker',
      used: false,
      discount: 0.7,
    },
  ];

  public isShoppingCart: boolean = true;

  public totalPrice: number = 0;

  public selected: number = 0;

  private selectedData: string[] = [];

  public checkAll: boolean = true;

  private selectedObserver: Subscription;

  private deleteObserver: Subscription;

  public numberStyle: StyleArrow = {
    up: 0.2,
    down: 1,
  };

  public directionStyle: StyleArrow = {
    up: 1,
    down: 1,
  };

  public tripStyle: StyleArrow = {
    up: 1,
    down: 1,
  };

  public dateStyle: StyleArrow = {
    up: 1,
    down: 1,
  };

  public passengerStyle: StyleArrow = {
    up: 1,
    down: 1,
  };

  public priceStyle: StyleArrow = {
    up: 1,
    down: 1,
  };

  public discountInfo: string = 'Promo Code: rsschool';

  public discountFormControl: FormControl;

  public discountBorderColor: string = '#74767A';

  private isApplyButtonClick: boolean = false;

  @ViewChild('tableContainer', { read: ViewContainerRef, static: true }) table: ViewContainerRef;

  constructor(
    private store: Store,
    private detect: ChangeDetectorRef,
    private switcher: CartSwitcherService,
    private sort: SortingService,
    private routerParam: ActivatedRoute,
    private headerChange: HeaderChangerService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.showTableRecords();
  }

  ngOnInit(): void {
    this.isShoppingCart = this.routerParam.snapshot.data['cart'];
    this.routerParam.data.subscribe((data) => {
      const { headerView } = data;
      this.headerChange.changePage(headerView);
    });
    this.selectedObserver = this.switcher.selection.subscribe((arg: SelectionTicketEvent): void => {
      this.showSelected(arg);
    });

    this.deleteObserver = this.switcher.delete.subscribe((flightNumber: string) => {
      this.showDelete(flightNumber);
    });

    this.discountFormControl = new FormControl('');

    this.flights$ = this.store.select(CartSelect.selectFlights);
    this.flightSubscription = this.flights$.subscribe((data: CartState) => {
      this.flights = [];
      data.flights.forEach((item: CartFlight) => {
        const oldItem = JSON.stringify(item);
        const newItem: CartFlight = JSON.parse(oldItem);
        this.flights.push(newItem);
      });
      this.selected = data.flights.length;
      this.detect.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.flightSubscription.unsubscribe();
    this.selectedObserver.unsubscribe();
    this.deleteObserver.unsubscribe();
  }

  public selectAll(): void {
    if (this.checkAll) {
      this.selectedData = [];
      this.flights.forEach((flight) => {
        this.selectedData.push(flight.flight.forward.flightNumber);
      });
      this.selected = this.selectedData.length;
    } else {
      this.selectedData = [];
      this.selected = 0;
    }
    this.switcher.selectAllEv(this.checkAll);
  }

  public getTotalCost(): Price {
    const totalCost: Price = {
      eur: 0,
      usd: 0,
      rub: 0,
      pln: 0,
    } as Price;
    this.flights.forEach((flight: CartFlight) => {
      if (Object.hasOwn(flight, 'checked')) {
        if (flight.checked) {
          Object.keys(flight.totalCost).forEach((key) => {
            totalCost[key] += flight.totalCost[key];
          });
        }
      } else {
        Object.keys(flight.totalCost).forEach((key) => {
          totalCost[key] += flight.totalCost[key];
        });
      }
    });
    return totalCost;
  }

  private showTableRecords(): void {
    this.flights.forEach((flight: CartFlight) => {
      const record = this.table.createComponent(TableRecordComponent);
      record.instance.cartFlight = flight;
      record.instance.isShoppingRecord = this.isShoppingCart;
      this.detect.detectChanges();
    });
  }

  private showSelected(arg: SelectionTicketEvent): void {
    const oldFlights = JSON.stringify(this.flights);
    const newFlights: CartFlight[] = JSON.parse(oldFlights);

    if (arg.checked) {
      this.selected += 1;
      this.selectedData.push(arg.flight);
    } else {
      this.selected = this.selected ? this.selected -= 1 : this.selected;
      this.selectedData = this.selectedData.filter((flight: string) => flight !== arg.flight);
    }

    newFlights.forEach((item: CartFlight) => {
      if (item.flight.forward.flightNumber === arg.flight) {
        item.checked = arg.checked;
      }
    });

    if (this.selectedData.length === newFlights.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }

    this.store.dispatch(addNewPrice({ flights: newFlights }));
  }

  private showDelete(flightNumber: string): void {
    this.flights = this.flights
      .filter((flight: CartFlight): boolean => flight.flight.forward.flightNumber !== flightNumber);

    const oldFlights: string = JSON.stringify(this.flights);
    const newFlights: CartFlight[] = JSON.parse(oldFlights);
    this.store.dispatch(addNewPrice({ flights: newFlights }));

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortNo(): void {
    this.resetArrows('no');
    if (this.numberStyle.up === 1) {
      this.numberStyle.up = 0.2;
      this.numberStyle.down = 1;
      this.flights = this.sort.sortByNum(this.flights, SortOrder.ASC);
    } else {
      this.numberStyle.up = 1;
      this.numberStyle.down = 0.2;
      this.flights = this.sort.sortByNum(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortFlight(): void {
    this.resetArrows('direction');
    if (this.directionStyle.up === 1) {
      this.directionStyle.up = 0.2;
      this.directionStyle.down = 1;
      this.flights = this.sort.sortByNum(this.flights, SortOrder.ASC);
    } else {
      this.directionStyle.up = 1;
      this.directionStyle.down = 0.2;
      this.flights = this.sort.sortByNum(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortTrip():void {
    this.resetArrows('trip');
    if (this.tripStyle.up === 1) {
      this.tripStyle.up = 0.2;
      this.tripStyle.down = 1;
      this.flights = this.sort.sortTrip(this.flights, SortOrder.ASC);
    } else {
      this.tripStyle.up = 1;
      this.tripStyle.down = 0.2;
      this.flights = this.sort.sortTrip(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortDate(): void {
    this.resetArrows('date');
    if (this.dateStyle.up === 1) {
      this.dateStyle.up = 0.2;
      this.dateStyle.down = 1;
      this.flights = this.sort.sortDate(this.flights, SortOrder.ASC);
    } else {
      this.dateStyle.up = 1;
      this.dateStyle.down = 0.2;
      this.flights = this.sort.sortDate(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortPassnger(): void {
    this.resetArrows('passenger');
    if (this.passengerStyle.up === 1) {
      this.passengerStyle.up = 0.2;
      this.passengerStyle.down = 1;
      this.flights = this.sort.sortPassengers(this.flights, SortOrder.ASC);
    } else {
      this.passengerStyle.up = 1;
      this.passengerStyle.down = 0.2;
      this.flights = this.sort.sortPassengers(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortPrice(): void {
    this.resetArrows('price');
    if (this.priceStyle.up === 1) {
      this.priceStyle.up = 0.2;
      this.priceStyle.down = 1;
      this.flights = this.sort.sortPrice(this.flights, SortOrder.ASC);
    } else {
      this.priceStyle.up = 1;
      this.priceStyle.down = 0.2;
      this.flights = this.sort.sortPrice(this.flights, SortOrder.DESC);
    }

    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  private resetArrows(marker: string): void {

    if (marker !== 'no') {
      this.numberStyle.up = 1;
      this.numberStyle.down = 1;
    }

    if (marker !== 'direction') {
      this.directionStyle.up = 1;
      this.directionStyle.down = 1;
    }

    if (marker !== 'trip') {
      this.tripStyle.up = 1;
      this.tripStyle.down = 1;
    }

    if (marker !== 'date') {
      this.dateStyle.up = 1;
      this.dateStyle.down = 1;
    }

    if (marker !== 'passenger') {
      this.passengerStyle.up = 1;
      this.passengerStyle.down = 1;
    }

    if (marker !== 'price') {
      this.priceStyle.up = 1;
      this.priceStyle.down = 1;
    }

  }

  private checkDiscount(): void {
    this.promocode.forEach((discount: Discount) => {
      if (discount.used) {

        const newJSONFlight: string = JSON.stringify(this.flights);

        const newFlight: CartFlight[] = JSON.parse(newJSONFlight);

        newFlight.forEach((flight: CartFlight) => {
          flight.totalCost.eur = Number(flight.totalCost.eur * discount.discount);
          flight.totalCost.usd = Number(flight.totalCost.usd * discount.discount);
          flight.totalCost.pln = Number(flight.totalCost.pln * discount.discount);
          flight.totalCost.rub = Number(flight.totalCost.rub * discount.discount);
        });

        this.store.dispatch(addNewPrice({ flights: newFlight }));
      }
    });
  }

  public applyPromo(): void {
    if (!this.isApplyButtonClick) {
      this.isApplyButtonClick = true;

      const isPromoYet: boolean = this.promocode.some((promoObj: Discount): boolean => {

        if (promoObj.used) {
          this.discountInfo = 'You already have discount!';
          this.discountBorderColor = '#e0940a';
          return true;
        }

        return false;
      });

      if (!isPromoYet) {
        this.promocode.some((promoObj: Discount, index: number) => {
          if (this.discountFormControl.value === promoObj.code) {
            if (promoObj.used) {
              this.discountInfo = 'Promocode have been used yet!';
              this.discountBorderColor = '#e0940a';
            } else {
              this.promocode[index].used = true;
              this.checkDiscount();
              this.discountInfo = 'Promocode is valid';
              this.discountBorderColor = '#23b705';
            }
          } else {
            this.discountInfo = 'Promocode invalid!';
            this.discountBorderColor = '#a90303';
          }

          return promoObj;
        });
      }

      setTimeout(() => {
        this.discountInfo = 'Promo Code';
        this.discountBorderColor = '#74767A';
        this.discountFormControl.reset();
        this.isApplyButtonClick = false;
      }, 3000);
    }
  }

  public toNewItem(): void {
    this.router.navigate(['']);
  }

  public paymentBtn(): void {
    this.snackBar.open('You just bought tickets!', 'Congratulation!', { duration: 3000 });
    this.router.navigate(['/account']);
  }

}
