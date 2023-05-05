import {
  AfterViewInit,
  Component, ViewChild, ViewContainerRef, ViewEncapsulation,
} from '@angular/core';
import { OneTiket, TableRecordComponent } from '../../../shared/components/table-record/table-record.component';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShoppingCartPageComponent implements AfterViewInit {

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

  @ViewChild('tableContainer', { read: ViewContainerRef, static: true }) table: ViewContainerRef;

  ngAfterViewInit(): void {
    this.ticketsData.forEach((ticket: OneTiket) => {
      const record = this.table.createComponent(TableRecordComponent);
      record.instance.inputData = ticket;
      const price = ticket.price.slice(1, ticket.price.length);
      this.totalPrice += parseFloat(price);
    });
  }

}
