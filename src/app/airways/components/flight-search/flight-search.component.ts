import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ICity } from 'src/app/services/cities.model';
import { Passengers } from '../../models/passengers';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {

  @ViewChild('passengersInput', { read: ElementRef }) input: ElementRef | undefined;

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
    { value: 'Round Trip', checked: true },
    { value: 'One Way', checked: false },
  ];

  public countries: ICity[] = [];

  public isFocused: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.flightSearchForm = new FormGroup({
      from: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      startDate: new FormControl<Date | null>(null, Validators.required),
      endDate: new FormControl<Date | null>(null, Validators.required),
      passengers: new FormControl(this.getPassengers(), Validators.required),
    });
    this.dataService.getAllCities().subscribe((data) => {
      this.countries = data;
      return this.countries;
    });
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

  public switch(): void {
    const tmp = this.flightSearchForm.get('from')?.value;
    this.flightSearchForm.get('from')?.setValue(this.flightSearchForm.get('destination')?.value);
    this.flightSearchForm.get('destination')?.setValue(tmp);
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
    this.input?.nativeElement.focus();
    this.passengers[value].count -= 1;
    this.setPassengers();
  }

  increment(value: 'adult' | 'child' | 'infant'): void {
    this.input?.nativeElement.focus();
    this.passengers[value].count += 1;
    this.setPassengers();
  }

  search() {
    // TODO: route to next page
  }

}
