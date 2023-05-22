import { AfterViewInit, Component } from '@angular/core';
import { Passengers } from 'src/app/airways/models/passengers';
import { AgePassenger } from '../../enums/tickets-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit {

  public passengers: Passengers | null;

  public totalPrice = 0;

  public resultArray: AgePassenger[] = [];

  public titlesArray: string[] = ['x Adult Fare ', 'x Child Fare', 'x Infant Fare '];

  ngAfterViewInit(): void {
    this.initSummaryData();
  }

  private initSummaryData(): void {
    /*
    const initAgePassenger: AgePassenger = {
      count: 0,
      fare: 0,
      tax: 0,
      total: 0,
    };

    const adult: AgePassenger = { ...initAgePassenger };
    const child: AgePassenger = { ...initAgePassenger };
    const infant: AgePassenger = { ...initAgePassenger };

    this.tickets.forEach((ticket) => {
      adult.count += ticket.prices.adult.length;
      child.count += ticket.prices.child.length;
      infant.count += ticket.prices.child.length;

      if (adult.count) {
        ticket.prices.adult.forEach((oneData: Passenger) => {
          adult.fare += oneData.fare;
          adult.tax += oneData.tax;
          adult.total = adult.total + oneData.fare + oneData.tax;
        });
      }

      if (child.count) {
        ticket.prices.child.forEach((oneData: Passenger) => {
          child.fare += oneData.fare;
          child.tax += oneData.tax;
          child.total = child.total + oneData.fare + oneData.tax;
        });
      }

      if (infant.count) {
        ticket.prices.infant.forEach((oneData: Passenger) => {
          infant.fare += oneData.fare;
          infant.tax += oneData.tax;
          infant.total = infant.total + oneData.fare + oneData.tax;
        });
      }
    });
    this.resultArray.push(adult);
    this.resultArray.push(child);
    this.resultArray.push(infant);
    this.totalPrice = adult.total + child.total + infant.total;
    */
  }

}
