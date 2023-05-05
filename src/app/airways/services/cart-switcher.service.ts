import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface SelectionTicketEvent {
  checked: boolean,
  flight: string
}

@Injectable({
  providedIn: 'root',
})
export class CartSwitcherService {

  private observe: Subject<SelectionTicketEvent> = new Subject<SelectionTicketEvent>();

  public selection: Observable<SelectionTicketEvent> = this.observe.asObservable();

  public selectionEv(ev: SelectionTicketEvent): void {
    this.observe.next(ev);
  }

}
