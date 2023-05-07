import { Injectable } from '@angular/core';
import { OneTicket } from '../../shared/enums/tickets-data';

@Injectable({
  providedIn: 'root',
})
export class SortingService {

  public sortByReverse(tickets: OneTicket[]): OneTicket[] {
    return tickets.reverse();
  }

  public sortTripAscendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      if (prev.type === 'One way' && next.type === 'Round Trip') {
        return -1;
      }
      if (prev.type === 'Round Trip' && next.type === 'One way') {
        return 1;
      }
      return 0;
    });
  }

  public sortTripDescendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      if (prev.type === 'Round Trip' && next.type === 'One way') {
        return -1;
      }
      if (prev.type === 'One way' && next.type === 'Round Trip') {
        return 1;
      }
      return 0;
    });
  }

  public sortingDateAscendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      const indexPrev = prev.date[0].indexOf('—');
      const indexNext = next.date[0].indexOf('—');
      const datePrev = Date.parse(prev.date[0].slice(0, indexPrev));
      const dateNext = Date.parse(next.date[0].slice(0, indexNext));
      return datePrev - dateNext;
    });
  }

  public sortingDateDescendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      const indexPrev = prev.date[0].indexOf('—');
      const indexNext = next.date[0].indexOf('—');
      const datePrev = Date.parse(prev.date[0].slice(0, indexPrev));
      const dateNext = Date.parse(next.date[0].slice(0, indexNext));
      return dateNext - datePrev;
    });
  }

  public sortingPassengerAscendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      let prevPassengerCount = 0;
      let nextPassengerCount = 0;

      prev.passengers.forEach((passenger: string) => {
        const index = passenger.indexOf(' ');
        const count = Number(passenger.slice(0, index));
        prevPassengerCount += count;
      });

      next.passengers.forEach((passenger: string) => {
        const index = passenger.indexOf(' ');
        const count = Number(passenger.slice(0, index));
        nextPassengerCount += count;
      });

      return prevPassengerCount - nextPassengerCount;
    });
  }

  public sortingPassengerDescendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      let prevPassengerCount = 0;
      let nextPassengerCount = 0;

      prev.passengers.forEach((passenger: string) => {
        const index = passenger.indexOf(' ');
        const count = Number(passenger.slice(0, index));
        prevPassengerCount += count;
      });

      next.passengers.forEach((passenger: string) => {
        const index = passenger.indexOf(' ');
        const count = Number(passenger.slice(0, index));
        nextPassengerCount += count;
      });

      return nextPassengerCount - prevPassengerCount;
    });
  }

  public sortingPriceAscendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      const prevPrice = prev.price.slice(1, prev.price.length);
      const nextPrice = next.price.slice(1, next.price.length);

      return parseFloat(prevPrice) - parseFloat(nextPrice);
    });
  }

  public sortingPriceDescendence(tickets: OneTicket[]): OneTicket[] {
    return tickets.sort((prev: OneTicket, next: OneTicket) => {
      const prevPrice = prev.price.slice(1, prev.price.length);
      const nextPrice = next.price.slice(1, next.price.length);

      return parseFloat(nextPrice) - parseFloat(prevPrice);
    });
  }

}
