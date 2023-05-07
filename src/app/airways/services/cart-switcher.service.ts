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

  private observeSelection: Subject<SelectionTicketEvent> = new Subject<SelectionTicketEvent>();

  public selection: Observable<SelectionTicketEvent> = this.observeSelection.asObservable();

  private observerDelete: Subject<string> = new Subject<string>();

  public delete: Observable<string> = this.observerDelete.asObservable();

  private observerSelectAll: Subject<boolean> = new Subject<boolean>();

  public selectAll: Observable<boolean> = this.observerSelectAll.asObservable();

  public selectionEv(ev: SelectionTicketEvent): void {
    this.observeSelection.next(ev);
  }

  public deleteEv(flight: string): void {
    this.observerDelete.next(flight);
  }

  public selectAllEv(marker: boolean): void {
    this.observerSelectAll.next(marker);
  }

}
