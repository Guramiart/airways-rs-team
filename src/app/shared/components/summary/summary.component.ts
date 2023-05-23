import { AfterViewInit, Component } from '@angular/core';
import { Price } from 'src/app/services/flight.model';
import { Passengers } from 'src/app/airways/models/passengers';
import { AgePassenger } from '../../enums/tickets-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit {

  private CHILD_DISCOUNT: number = 25;

  private INFANT_DISCOUNT: number = 75;

  private TAX: number = 35;

  public passengers: Passengers;

  public cost: Price;

  public resultArray: AgePassenger[] = [];

  public titlesArray: string[] = ['x Adult Fare ', 'x Child Fare', 'x Infant Fare '];

  ngAfterViewInit(): void {
    this.initSummaryData();
  }

  private initSummaryData(): void {

    const initAgePassenger: AgePassenger = {
      count: 0,
      fare: 0,
      tax: 0,
      total: 0,
    };

    const adult: AgePassenger = { ...initAgePassenger };
    const child: AgePassenger = { ...initAgePassenger };
    const infant: AgePassenger = { ...initAgePassenger };

    if (this.passengers?.passengers.adult.count) {
      adult.count = this.passengers?.passengers.adult.count;
      adult.total = this.cost.eur;
      adult.tax = (adult.total / 100) * this.TAX;
      adult.fare = adult.total - adult.tax;
      this.resultArray.push(adult);
    }

    if (this.passengers?.passengers.child.count) {
      child.count = this.passengers?.passengers.child.count;
      const childTotal = this.cost.eur * (this.CHILD_DISCOUNT / 100);
      child.total = childTotal;
      child.tax = (childTotal / 100) * this.TAX;
      child.fare = childTotal - child.tax;
      this.resultArray.push(child);
    }

    if (this.passengers?.passengers.infant.count) {
      infant.count = this.passengers?.passengers.infant.count;
      const infantTotal = this.cost.eur * (this.INFANT_DISCOUNT / 100);
      infant.total = infantTotal;
      infant.tax = (infantTotal / 100) * this.TAX;
      infant.fare = infantTotal - infant.tax;
      this.resultArray.push(infant);
    }

  }

}
