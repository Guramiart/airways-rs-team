import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DATE_FORMATS } from 'src/app/shared/enums/date-format';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { FlightTypes } from 'src/app/shared/enums/flight-types';
import { Airport } from 'src/app/services/flight.model';
import { Passengers } from '../../models/passengers';
import * as SettingSelect from '../../../redux/selectors/settings.selector';
import * as FlightActions from '../../../redux/actions/flight.actions';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit, OnDestroy {

  @ViewChild('passengersInput', { read: ElementRef }) input: ElementRef | undefined;

  private format$: Observable<string> | undefined;

  private searchData: Subscription;

  public passengers: Passengers = {
    passengers: {
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
    },
    total: 0,
  };

  public flightSearchForm: FormGroup = new FormGroup({});

  public flightTypes = [
    { value: FlightTypes.ROUND, checked: true },
    { value: FlightTypes.ONE_WAY, checked: false },
  ];

  public countries: Airport[] = [];

  public isFocused: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.flightSearchForm = new FormGroup({
      flightType: new FormControl(FlightTypes.ROUND),
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
    this.dataService.setAuthUserFromLS();
  }

  ngOnDestroy(): void {
    if (this.searchData) {
      this.searchData.unsubscribe();
    }
  }

  private updateDate(): void {
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
    if (this.passengers.passengers.adult.count !== 0) {
      title.push(`${this.passengers.passengers.adult.count} ${this.passengers.passengers.adult.name}`);
    }
    if (this.passengers.passengers.child.count !== 0) {
      title.push(`${this.passengers.passengers.child.count} ${this.passengers.passengers.child.name}`);
    }
    if (this.passengers.passengers.infant.count !== 0) {
      title.push(`${this.passengers.passengers.infant.count} ${this.passengers.passengers.infant.name}`);
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
    this.passengers.passengers[value].count -= 1;
    this.setPassengers();
  }

  increment(value: 'adult' | 'child' | 'infant'): void {
    this.passengers.passengers[value].count += 1;
    this.setPassengers();
  }

  search(): void {
    const type = this.flightSearchForm.get('flightType')?.value;
    const forwardDate = this.flightSearchForm.get('startDate')?.value;
    const backDate = this.flightSearchForm.get('endDate')?.value;
    this.searchData = this.dataService.searchFlights({
      fromKey: this.flightSearchForm.get('from')?.value.key,
      toKey: this.flightSearchForm.get('destination')?.value.key,
      forwardDate,
      backDate,
    }).subscribe((resp) => {
      this.passengers.total = Object
        .values(this.passengers.passengers).reduce((acc, curr) => acc + curr.count, 0);
      this.store.dispatch(FlightActions.updateFlights({
        flightType: type,
        from: resp[0],
        destination: resp[1],
        startDate: forwardDate,
        endDate: backDate,
        passengers: this.passengers,
      }));
      this.router.navigateByUrl('step/1');
    });
  }

}
