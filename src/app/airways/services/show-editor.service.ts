import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowEditorService {

  private observe: Subject<void> = new Subject<void>();

  private buttonObserver: Subject<boolean> = new Subject<boolean>();

  public emit: Observable<void> = this.observe.asObservable();

  public button: Observable<boolean> = this.buttonObserver.asObservable();

  public showEditor(): void {
    return this.observe.next();
  }

  public showButtonEditor(show: boolean): void {
    this.buttonObserver.next(show);
  }

}
