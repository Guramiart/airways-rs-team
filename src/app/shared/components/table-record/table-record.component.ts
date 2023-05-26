import {
  AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { CartFlight, FlightTableRow } from 'src/app/redux/state.model';
import { Flight } from 'src/app/services/flight.model';
import { Passengers, PassengerDetail } from 'src/app/airways/models/passengers';
import { CartSwitcherService } from 'src/app/airways/services/cart-switcher.service';
import { Subscription } from 'rxjs';
import { FlightTypes } from '../../enums/flight-types';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.scss'],
})
export class TableRecordComponent implements OnInit, AfterViewChecked, OnDestroy {

  public tableData: FlightTableRow;

  public cartFlight: CartFlight;

  public cartPassengers: Passengers;

  public isShoppingRecord: boolean;

  public numberFlight: string;

  public check: boolean = false;

  private selectAllObserver: Subscription;

  constructor(private detector: ChangeDetectorRef, private switcher: CartSwitcherService) {
    this.detector.detach();
  }

  public onChecked(): void {
    this.switcher.selectionEv({ checked: this.check, flight: this.numberFlight });
  }

  public deleteItem(): void {
    this.switcher.deleteEv(this.numberFlight);
  }

  public editItem(): void {
    // TODO: This need to paste routing for edit page
  }

  ngOnInit(): void {
    this.selectAllObserver = this.switcher.selectAll.subscribe((marker) => {
      this.check = marker;
      this.detector.detectChanges();
    });
    this.tableData = this.initTableData();
  }

  ngAfterViewChecked(): void {
    this.detector.detectChanges();
  }

  ngOnDestroy(): void {
    this.selectAllObserver.unsubscribe();
  }

  private initTableData(): FlightTableRow {
    const tableData = {
      flightNumber: [],
      direction: [],
      date: [],
      flightType: '',
      total: null,
    } as FlightTableRow;
    Object.values(this.cartFlight.flight).forEach((value: Flight) => {
      if (value !== null) {
        tableData.flightNumber.push(value.flightNumber);
        tableData.direction.push(`${value.form.city} - ${value.to.city}`);
        tableData.date.push({ start: value.takeoffDate, end: value.landingDate });
      }
    });
    tableData.flightType = (tableData.direction.length === 1)
      ? FlightTypes.ONE_WAY
      : FlightTypes.ROUND;
    tableData.total = this.cartFlight.totalCost;
    return tableData;
  }

  public getPassengers(): string[] {
    const passenger: string[] = [];
    Object.values(this.cartPassengers.passengers).forEach((value: PassengerDetail) => {
      if (value.count !== 0) {
        passenger.push(`${value.count} x ${value.name}`);
      }
    });
    return passenger;
  }

}
