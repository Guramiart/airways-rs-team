import {
  Component, OnInit, OnDestroy, ChangeDetectorRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Airport } from 'src/app/services/flight.model';
import { IFlightState } from 'src/app/redux/state.model';
import { ShowEditorService } from '../../services/show-editor.service';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as PassengersSelect from '../../../redux/selectors/passenger.selector';
import { Passengers } from '../../models/passengers';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})
export class BookingEditComponent implements OnInit, OnDestroy {

  public isButton: boolean;

  public flights$: Observable<IFlightState>;

  public passengers$: Observable<Passengers>;

  public destination$: Observable<Airport>;

  private buttonObserver: Subscription;

  constructor(
    private store: Store,
    private emit: ShowEditorService,
    private detectorChange: ChangeDetectorRef,
  ) {
    this.detectorChange.detach();
  }

  ngOnInit(): void {
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.passengers$ = this.store.select(PassengersSelect.selectPassengers);

    this.buttonObserver = this.emit.button.subscribe((isShow: boolean) => {
      this.isButton = isShow;
      this.detectorChange.detectChanges();
    });
  }

  public showBookingEditor(): void {
    this.emit.showEditor();
  }

  ngOnDestroy(): void {
    this.buttonObserver.unsubscribe();
  }

}
