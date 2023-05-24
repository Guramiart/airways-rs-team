import { Component, OnInit } from '@angular/core';
import { Price } from 'src/app/services/flight.model';
import { Passengers } from 'src/app/airways/models/passengers';
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
      const adult: AgePassenger = this.getInitObj();
      adult.count = this.passengers.passengers.adult.count;
      Object.keys(this.cost).forEach((key) => {
        adult.total[key] = this.cost[key] * adult.count;
        adult.tax[key] = (adult.total[key] / 100) * this.TAX;
        adult.fare[key] = adult.total[key] - adult.tax[key];
      });
      this.resultArray.push(adult);
    }

    if (this.passengers.passengers.child.count) {
      const child: AgePassenger = this.getInitObj();
      child.count = this.passengers.passengers.child.count;
      Object.keys(this.cost).forEach((key) => {
        child.total[key] = (this.cost[key] * (this.CHILD_DISCOUNT / 100)) * child.count;
        child.tax[key] = (child.total[key] / 100) * this.TAX;
        child.fare[key] = child.total[key] - child.tax[key];
      });
      this.resultArray.push(child);
    }

    if (this.passengers.passengers.infant.count) {
      const infant: AgePassenger = this.getInitObj();
      infant.count = this.passengers.passengers.infant.count;
      Object.keys(this.cost).forEach((key) => {
        infant.total[key] = (this.cost[key] * (this.INFANT_DISCOUNT / 100)) * infant.count;
        infant.tax[key] = (infant.total[key] / 100) * this.TAX;
        infant.fare[key] = infant.total[key] - infant.tax[key];
      });
      this.resultArray.push(infant);
    }

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
