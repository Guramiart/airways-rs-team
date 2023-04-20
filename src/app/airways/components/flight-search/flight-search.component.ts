import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {

  public flightSearchForm: FormGroup = new FormGroup({});

  constructor(public _formBuilder: FormBuilder) {
  }

  public flightTypes = [
    { value: 'Round Trip', checked: true },
    { value: 'One Way', checked: false },
  ];

  public test = [
    { value: 'country-1', viewValue: 'Country-1' },
    { value: 'country-2', viewValue: 'Country-2' },
    { value: 'country-3', viewValue: 'Country-3' },
  ];

  ngOnInit(): void {
    this.flightSearchForm = new FormGroup({
      from: new FormControl('Default'),
      destination: new FormControl(''),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    });
  }

  search() {
    console.log(`From: ${this.flightSearchForm.get('from')?.value}`);
    console.log(`To: ${this.flightSearchForm.get('destination')?.value}`);
    console.log(`Start: ${this.flightSearchForm.get('startDate')?.value}`);
    console.log(`End: ${this.flightSearchForm.get('endDate')?.value}`);
  }

}
