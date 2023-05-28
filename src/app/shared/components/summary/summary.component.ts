import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/services/flight.model';
import { PassengerDetail, Passengers } from 'src/app/airways/models/passengers';
import { AgePassenger } from '../../enums/tickets-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  private CHILD_DISCOUNT: number = 25;

  private INFANT_DISCOUNT: number = 75;

  private TAX: number = 35;

  public passengers: Passengers;

  public cost: Price;

  public totalCost: Price;

  public resultArray: AgePassenger[] = [];

  public titlesArray: string[] = ['Adult Fare', 'Child Fare', 'Infant Fare'];

  ngOnInit(): void {
    this.initSummaryData();
    this.totalCost = this.getTotalCost();
  }

  private initSummaryData(): void {

    if (this.passengers.passengers.adult.count) {
      this.initPassengerPrice(this.passengers.passengers.adult, 100);
    }
    if (this.passengers.passengers.child.count) {
      this.initPassengerPrice(this.passengers.passengers.child, this.CHILD_DISCOUNT);
    }
    if (this.passengers.passengers.infant.count) {
      this.initPassengerPrice(this.passengers.passengers.infant, this.INFANT_DISCOUNT);
    }

  }

  private initPassengerPrice(detail: PassengerDetail, discount: number) {
    const passanger: AgePassenger = this.getInitObj();
    passanger.count = detail.count;
    Object.keys(this.cost).forEach((key) => {
      passanger.total[key] = (this.cost[key] * (discount / 100)) * passanger.count;
      passanger.tax[key] = (passanger.total[key] / 100) * this.TAX;
      passanger.fare[key] = passanger.total[key] - passanger.tax[key];
    });
    this.resultArray.push(passanger);
  }

  private getTotalCost(): Price {
    const totalCost: Price = {
      eur: 0, usd: 0, rub: 0, pln: 0,
    };
    this.resultArray.forEach((el) => {
      Object.keys(el.total).forEach((key) => {
        totalCost[key] += el.total[key];
      });
    });
    return totalCost;
  }

  private getInitObj(): AgePassenger {
    return {
      count: 0,
      fare: {
        eur: 0, usd: 0, rub: 0, pln: 0,
      },
      tax: {
        eur: 0, usd: 0, rub: 0, pln: 0,
      },
      total: {
        eur: 0, usd: 0, rub: 0, pln: 0,
      },
    };
  }

}
