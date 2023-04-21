import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Passengers } from '../../models/passengers';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {

  public flightSearchForm: FormGroup = new FormGroup({});

  public flightTypes = [
    { value: 'Round Trip', checked: true },
    { value: 'One Way', checked: false },
  ];

  public test = [
    { value: 'country-1', viewValue: 'Country-1' },
    { value: 'country-2', viewValue: 'Country-2' },
    { value: 'country-3', viewValue: 'Country-3' },
  ];

  public isFocused: boolean = false;

  @ViewChild('passengersInput', { read: ElementRef }) input: ElementRef | undefined;

  public adultCounter: number = 0;

  public childCounter: number = 0;

  public infantCounter: number = 0;

  private passengers: Passengers = {
    adult: '',
    child: '',
    infant: '',
  };

  ngOnInit(): void {
    this.flightSearchForm = new FormGroup({
      from: new FormControl('Choose your from'),
      destination: new FormControl('Choose your destination'),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      passengers: new FormControl(this.getPassengers()),
    });
  }

  private getPassengers(): string {
    return Object.values(this.passengers)
      .filter((el) => el !== '')
      .join(', ');
  }

  private setPassengers(): void {
    this.flightSearchForm.get('passengers')?.setValue(this.getPassengers());
  }

  focus(): void {
    this.isFocused = true;
  }

  foo() {
    if (!this.isFocused) {
      this.input?.nativeElement.focus();
    } else {
      this.input?.nativeElement.blur();
    }
    this.isFocused = !this.isFocused;
  }

  adultDecrement() {
    this.adultCounter -= 1;
    if (this.adultCounter !== 0) {
      this.passengers.adult = `${this.adultCounter} Adult`;
    } else {
      this.passengers.adult = '';
    }
    this.setPassengers();
  }

  adultIncrement() {
    this.adultCounter += 1;
    this.passengers.adult = `${this.adultCounter} Adult`;
    this.setPassengers();
  }

  childDecrement() {
    this.childCounter -= 1;
    if (this.childCounter !== 0) {
      this.passengers.child = `${this.childCounter} Child`;
    } else {
      this.passengers.child = '';
    }
    this.setPassengers();
  }

  childIncrement() {
    this.childCounter += 1;
    this.passengers.child = `${this.childCounter} Child`;
    this.setPassengers();
  }

  infantDecrement() {
    this.infantCounter -= 1;
    if (this.infantCounter !== 0) {
      this.passengers.infant = `${this.infantCounter} Infant`;
    } else {
      this.passengers.infant = '';
    }
    this.setPassengers();
  }

  infantIncrement() {
    this.infantCounter += 1;
    this.passengers.infant = `${this.infantCounter} Infant`;
    this.setPassengers();
  }

  search() {}

}
