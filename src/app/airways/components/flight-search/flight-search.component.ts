import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DATE_FORMATS } from 'src/app/shared/enums/date-format';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ICity } from 'src/app/services/cities.model';
import { FlightTypes } from 'src/app/shared/enums/flight-types';
import { Passengers } from '../../models/passengers';
import * as SettingSelect from '../../../redux/selectors/settings.selector';
import * as FlightActions from '../../../redux/actions/flight.actions';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {

  @ViewChild('passengersInput', { read: ElementRef }) input: ElementRef | undefined;

  private format$: Observable<string> | undefined;

  public passengers: Passengers = {
    adult: {
      name: 'Adult',
      count: 0,
    },
    child: {
      name: 'Child',
      count: 0,
    },
    infant: {
      name: 'Infant',
      count: 0,
    },
  };

  public flightSearchForm: FormGroup = new FormGroup({});

  public flightTypes = [
    { value: FlightTypes.ROUND, checked: true },
    { value: FlightTypes.ONE_WAY, checked: false },
  ];

  public countries: ICity[] = [];

  public isFocused: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.flightSearchForm = new FormGroup({
      from: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      passengers: new FormControl(this.getPassengers(), Validators.required),
    });
    this.dataService.getAllCities().subscribe((data) => {
      this.countries = data;
      return this.countries;
    });
    this.format$ = this.store.select(SettingSelect.selectDateFormat);
    this.format$.subscribe((value) => {
      DATE_FORMATS.display.dateInput = value;
      this.updateDate();
    });
  }

  private updateDate() {
    const start = this.flightSearchForm.get('startDate')?.value;
    const end = this.flightSearchForm.get('endDate')?.value;
    if (start !== null) {
      this.flightSearchForm.get('startDate')?.setValue(new Date(start));
    }
    if (end !== null) {
      this.flightSearchForm.get('endDate')?.setValue(new Date(end));
    }
  }

  private getPassengers(): string {
    const title: string[] = [];
    if (this.passengers.adult.count !== 0) {
      title.push(`${this.passengers.adult.count} ${this.passengers.adult.name}`);
    }
    if (this.passengers.child.count !== 0) {
      title.push(`${this.passengers.child.count} ${this.passengers.child.name}`);
    }
    if (this.passengers.infant.count !== 0) {
      title.push(`${this.passengers.infant.count} ${this.passengers.infant.name}`);
    }
    return title.join(', ');
  }

  private setPassengers(): void {
    this.flightSearchForm.get('passengers')?.setValue(this.getPassengers());
  }

  public switchFlights(): void {
    const tmp = this.flightSearchForm.get('from')?.value;
    this.flightSearchForm.get('from')?.setValue(this.flightSearchForm.get('destination')?.value, { emitEvent: true });
    this.flightSearchForm.get('destination')?.setValue(tmp, { emitEvent: true });
    this.setFromFlight(this.flightSearchForm.get('from')?.value);
    this.setDestinationFlight(this.flightSearchForm.get('destination')?.value);
  }

  public toggleFocus(): void {
    if (!this.isFocused) {
      this.input?.nativeElement.focus();
    } else {
      this.input?.nativeElement.blur();
    }
    this.isFocused = !this.isFocused;
  }

  public decrement(value: 'adult' | 'child' | 'infant'): void {
    this.passengers[value].count -= 1;
    this.setPassengers();
  }

  increment(value: 'adult' | 'child' | 'infant'): void {
    this.passengers[value].count += 1;
    this.setPassengers();
  }

  setFromFlight(e: ICity): void {
    this.store.dispatch(FlightActions.changeFromFlight({ from: e }));
  }

  setDestinationFlight(e: ICity): void {
    this.store.dispatch(FlightActions.changeDestinationFlight({ destination: e }));
  }

  search() {
    this.router.navigateByUrl('step/1');
  }

}
