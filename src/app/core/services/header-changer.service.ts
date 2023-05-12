import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type EventHeader = {
  bgColor: boolean,
  showStepper: boolean | null
};

@Injectable({
  providedIn: 'root',
})
export class HeaderChangerService {

  private observe: Subject<EventHeader> = new Subject<EventHeader>();

  // TODO: this changePage for change color scheme of header

  public changePage(eventHeader: EventHeader): void {
    this.observe.next(eventHeader);
  }

  public onChangePage(): Observable<EventHeader> {
    return this.observe.asObservable();
  }

}
