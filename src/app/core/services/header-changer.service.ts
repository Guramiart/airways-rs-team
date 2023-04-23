import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderChangerService {

  private observe: Subject<void> = new Subject<void>();

  // TODO: this changePage for change color scheme of header

  public changePage(): void {
    this.observe.next();
  }

  public onChangePage(): Observable<void> {
    return this.observe.asObservable();
  }

}
