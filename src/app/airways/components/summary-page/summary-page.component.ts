import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {

  // TODO: replace the mok data after!!!
  private mokPassengerData = {
    adults: ['Harry Potter'],
    child: ['Lolli Potter'],
    infants: ['James Potter'],
    tickets: [
      {
        flight: 'FR1925',
        direction: 'Dublin — Warsaw Modlin',
        date: 'Wednesday, 1 March, 2023',
        time: '8:40 — 12:00',
        prices: {
          adult: {
            fare: 83,
            tax: 45.655,
          },
          child: {
            fare: 53,
            tax: 45.04,
          },
          infants: {
            fare: 44,
            tax: 5,
          },
        },
      },
      {
        flight: 'FR1925',
        direction: 'Warsaw Modlin — Dublin',
        date: 'Saturday, 18 March, 2023',
        time: '7:40 — 11:00',
        prices: {
          adult: {
            fare: 83,
            tax: 45.655,
          },
          child: {
            fare: 53,
            tax: 45.04,
          },
          infants: {
            fare: 44,
            tax: 5,
          },
        },
      },
    ],
  };

  constructor(private elemetRef: ElementRef) {
  }

}
