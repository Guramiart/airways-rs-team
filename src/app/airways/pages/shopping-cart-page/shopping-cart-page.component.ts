import {
  AfterViewInit, ChangeDetectorRef,
  Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TableRecordComponent } from '../../../shared/components/table-record/table-record.component';
import { CartSwitcherService, SelectionTicketEvent } from '../../services/cart-switcher.service';
import { SortingService } from '../../services/sorting-service.service';
import { OneTicket } from '../../../shared/enums/tickets-data';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShoppingCartPageComponent implements AfterViewInit, OnInit, OnDestroy {

  public ticketsData: OneTicket[] = [
    {
      numberFlight: 'FR 1925',
      flight: ['Dublin — Warsaw', 'Modlin — Dublin'],
      type: 'Round Trip',
      date: ['1 Mar, 2023, 8:40 — 12:00', '18 Mar, 2023, 7:40 — 11:00'],
      passengers: ['1 x Adult', '1 x Child', '1 x Infant'],
      price: '€551.38',
    },
    {
      numberFlight: 'FR 1936',
      flight: ['Gdansk — Warsaw'],
      type: 'One way',
      date: ['28 May, 2023, 15:40 — 16:40'],
      passengers: ['1 x Adult'],
      price: '€20.96',
    },
  ];

  public isShoppingCart = true;

  public totalPrice: number = 0;

  public selected = 0;

  private selectedData: string[] = [];

  public checkAll = false;

  private selectedObserver: Subscription;

  private deleteObserver: Subscription;

  public numberStyle = {
    up: 0.2,
    down: 1,
  };

  public directionStyle = {
    up: 1,
    down: 1,
  };

  public tripStyle = {
    up: 1,
    down: 1,
  };

  public dateStyle = {
    up: 1,
    down: 1,
  };

  public passengerStyle = {
    up: 1,
    down: 1,
  };

  public priceStyle = {
    up: 1,
    down: 1,
  };

  @ViewChild('tableContainer', { read: ViewContainerRef, static: true }) table: ViewContainerRef;

  constructor(
    private detect: ChangeDetectorRef,
    private switcher: CartSwitcherService,
    private sort: SortingService,
  ) { }

  ngAfterViewInit(): void {
    this.showTableRecords();
  }

  ngOnInit(): void {
    this.selectedObserver = this.switcher.selection.subscribe((arg: SelectionTicketEvent): void => {
      this.showSelected(arg);
    });

    this.deleteObserver = this.switcher.delete.subscribe((flightNumber: string) => {
      this.showDelete(flightNumber);
    });
  }

  ngOnDestroy(): void {
    this.selectedObserver.unsubscribe();
    this.deleteObserver.unsubscribe();
  }

  public selectAll(): void {
    if (this.checkAll) {
      this.selectedData = [];
      this.ticketsData.forEach((ticket) => {
        this.selectedData.push(ticket.numberFlight);
      });
      this.selected = this.selectedData.length;
    } else {
      this.selectedData = [];
      this.selected = 0;
    }
    this.switcher.selectAllEv(this.checkAll);
  }

  private showTableRecords(): void {
    this.ticketsData.forEach((ticket: OneTicket) => {
      const record = this.table.createComponent(TableRecordComponent);
      record.instance.inputData = ticket;
      record.instance.isShoppingRecord = this.isShoppingCart;
      const price = ticket.price.slice(1, ticket.price.length);
      this.totalPrice += parseFloat(price);
      this.detect.detectChanges();
    });
  }

  private showSelected(arg: SelectionTicketEvent): void {
    if (arg.checked) {
      this.selected += 1;
      this.selectedData.push(arg.flight);
    } else {
      this.selected = this.selected ? this.selected -= 1 : this.selected;
      this.selectedData = this.selectedData.filter((flight: string) => flight !== arg.flight);
    }

    if (this.selectedData.length === this.ticketsData.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
  }

  private showDelete(flightNumber: string): void {
    this.ticketsData = this.ticketsData.filter((ticket) => ticket.numberFlight !== flightNumber);
    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortNo(): void {
    this.resetArrows('no');
    if (this.numberStyle.up === 1) {
      this.numberStyle.up = 0.2;
      this.numberStyle.down = 1;
    } else {
      this.numberStyle.up = 1;
      this.numberStyle.down = 0.2;
    }
    this.ticketsData = this.sort.sortByReverse(this.ticketsData);
    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortFlight(): void {
    this.resetArrows('direction');
    if (this.directionStyle.up === 1) {
      this.directionStyle.up = 0.2;
      this.directionStyle.down = 1;
    } else {
      this.directionStyle.up = 1;
      this.directionStyle.down = 0.2;
    }
    this.ticketsData = this.sort.sortByReverse(this.ticketsData);
    this.table.clear();
    this.totalPrice = 0;
    this.showTableRecords();
  }

  public sortTrip():void {
    this.resetArrows('trip');
    if (this.tripStyle.up === 1) {
      this.tripStyle.up = 0.2;
      this.tripStyle.down = 1;
      this.ticketsData = this.sort.sortTripAscendence(this.ticketsData);
    } else {
      this.tripStyle.up = 1;
      this.tripStyle.down = 0.2;
      this.ticketsData = this.sort.sortTripDescendence(this.ticketsData);
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
      this.ticketsData = this.sort.sortingDateAscendence(this.ticketsData);
    } else {
      this.dateStyle.up = 1;
      this.dateStyle.down = 0.2;
      this.ticketsData = this.sort.sortingDateDescendence(this.ticketsData);
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
      this.ticketsData = this.sort.sortingPassengerAscendence(this.ticketsData);
    } else {
      this.passengerStyle.up = 1;
      this.passengerStyle.down = 0.2;
      this.ticketsData = this.sort.sortingPassengerDescendence(this.ticketsData);
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
      this.ticketsData = this.sort.sortingPriceAscendence(this.ticketsData);
    } else {
      this.priceStyle.up = 1;
      this.priceStyle.down = 0.2;
      this.ticketsData = this.sort.sortingPriceDescendence(this.ticketsData);
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

}
