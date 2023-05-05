import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSwitcherService {

  private observe: Subject<void> = new Subject<void>();

  public selection: Observable<void> = this.observe.asObservable();

  public selectionEv(): void {
    this.observe.next();
  }

}
