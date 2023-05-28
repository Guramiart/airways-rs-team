import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepperService {

  private observer: Subject<string> = new Subject<string>();

  public stepperEmmit: Observable<string> = this.observer.asObservable();

  public switchStepper(view: string): void {
    this.observer.next(view);
  }

}
