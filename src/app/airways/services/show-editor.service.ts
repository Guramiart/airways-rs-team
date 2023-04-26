import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowEditorService {

  private observe: Subject<void> = new Subject<void>();

  public emit: Observable<void> = this.observe.asObservable();

  public showEditor(): void {
    return this.observe.next();
  }

}
