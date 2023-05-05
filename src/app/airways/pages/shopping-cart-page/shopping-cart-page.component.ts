import {
  AfterViewInit, ChangeDetectorRef,
  Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { OneTiket, TableRecordComponent } from '../../../shared/components/table-record/table-record.component';
import { CartSwitcherService, SelectionTicketEvent } from '../../services/cart-switcher.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShoppingCartPageComponent implements AfterViewInit, OnInit, OnDestroy {

  public ticketsData = [
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

  public totalPrice: number = 0;

  public selected = 0;

  private selectedData: string[] = [];

  private selectedObserver: Subscription;

  @ViewChild('tableContainer', { read: ViewContainerRef, static: true }) table: ViewContainerRef;

  constructor(private detect: ChangeDetectorRef, private switcher: CartSwitcherService) {
  }

  ngAfterViewInit(): void {
    this.ticketsData.forEach((ticket: OneTiket) => {
      const record = this.table.createComponent(TableRecordComponent);
      record.instance.inputData = ticket;
      const price = ticket.price.slice(1, ticket.price.length);
      this.totalPrice += parseFloat(price);
      this.detect.detectChanges();
    });
  }

  ngOnInit(): void {
    this.selectedObserver = this.switcher.selection.subscribe((arg: SelectionTicketEvent): void => {
      if (arg.checked) {
        this.selected += 1;
        this.selectedData.push(arg.flight);
      } else {
        this.selected = this.selected ? this.selected -= 1 : this.selected;
        this.selectedData = this.selectedData.filter((flight: string) => flight !== arg.flight);
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedObserver.unsubscribe();
  }

}
