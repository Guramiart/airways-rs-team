import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FlightState } from 'src/app/redux/state.model';
import { ICity } from 'src/app/services/cities.model';
import { ShowEditorService } from '../../services/show-editor.service';
import * as FlightSelect from '../../../redux/selectors/flight.selector';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})
export class BookingEditComponent implements OnInit, OnDestroy {

  public isButton: boolean;

  public flights$: Observable<FlightState> | undefined;

  public destination$: Observable<ICity | null> | undefined;

  private buttonObserver: Subscription;

  constructor(
    private store: Store,
    private emit: ShowEditorService,
  ) {}

  ngOnInit(): void {
    this.flights$ = this.store.select(FlightSelect.selectFlight);

    this.buttonObserver = this.emit.button.subscribe((isShow: boolean) => {
      this.isButton = isShow;
    });
  }

  public showBookingEditor(): void {
    this.emit.showEditor();
  }

  ngOnDestroy(): void {
    this.buttonObserver.unsubscribe();
  }

}
