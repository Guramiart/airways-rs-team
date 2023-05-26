import { Injectable } from '@angular/core';
import { SortOrder } from 'src/app/shared/enums/order';
import { CartFlight } from 'src/app/redux/state.model';

@Injectable({
  providedIn: 'root',
})
export class SortingService {

  public sortByNum(flights: CartFlight[], sortOrder: SortOrder): CartFlight[] {
    const arr = [...flights];
    return arr.sort((prev: CartFlight, next: CartFlight) => {
      const prevNum: string = prev.flight.forward.flightNumber.toLowerCase();
      const nextNum: string = next.flight.forward.flightNumber.toLowerCase();
      return (sortOrder === SortOrder.ASC)
        ? prevNum.localeCompare(nextNum)
        : nextNum.localeCompare(prevNum);
    });
  }

  public sortTrip(flights: CartFlight[], sortOrder: SortOrder): CartFlight[] {
    const arr = [...flights];
    return arr.sort((prev: CartFlight, next: CartFlight) => {
      let index;
      if ((!prev.flight.reverse && next.flight.reverse)) {
        index = sortOrder === SortOrder.ASC ? -1 : 1;
        return index;
      }
      if (prev.flight.reverse && !next.flight.reverse) {
        index = sortOrder === SortOrder.ASC ? 1 : -1;
        return index;
      }
      return 0;
    });
  }

  public sortDate(flights: CartFlight[], sortOrder: SortOrder): CartFlight[] {
    const arr = [...flights];
    return arr.sort((prev: CartFlight, next: CartFlight) => {
      const datePrev = Date.parse(prev.flight.forward.takeoffDate);
      const dateNext = Date.parse(next.flight.forward.takeoffDate);
      return (sortOrder === SortOrder.ASC) ? datePrev - dateNext : dateNext - datePrev;
    });
  }

  public sortPassengers(flights: CartFlight[], sortOrder: SortOrder): CartFlight[] {
    const arr = [...flights];
    return arr.sort((prev: CartFlight, next: CartFlight) => {
      const prevCount = prev.passengers.total;
      const nextCount = next.passengers.total;
      return (sortOrder === SortOrder.ASC) ? prevCount - nextCount : nextCount - prevCount;
    });
  }

  public sortPrice(flights: CartFlight[], sortOrder: SortOrder): CartFlight[] {
    const arr = [...flights];
    return arr.sort((prev: CartFlight, next: CartFlight) => {
      const prevPrice = prev.totalCost.eur;
      const nextPrice = next.totalCost.eur;
      return (sortOrder === SortOrder.ASC) ? prevPrice - nextPrice : nextPrice - prevPrice;
    });
  }

}
