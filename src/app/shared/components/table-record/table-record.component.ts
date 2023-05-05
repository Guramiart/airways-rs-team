import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Event } from '@angular/router';
import { CartSwitcherService } from 'src/app/airways/services/cart-switcher.service';

export interface OneTiket {
  numberFlight: string,
  flight: string[],
  type: string,
  date: string[],
  passengers: string[],
  price: string,
}
@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.scss'],
})
export class TableRecordComponent implements AfterViewInit {

  public numberFlight: string;

  public flight: string[];

  public type: string;

  public date: string[];

  public passengers: string[];

  public price: string;

  public inputData: OneTiket;

  constructor(private detector: ChangeDetectorRef, private switcher: CartSwitcherService) {
    this.detector.detach();
  }

  public showData(): void {
    this.numberFlight = this.inputData.numberFlight;
    this.flight = this.inputData.flight;
    this.type = this.inputData.type;
    this.date = this.inputData.date;
    this.passengers = this.inputData.passengers;
    this.price = this.inputData.price;
    this.detector.detectChanges();
  }

  public onChecked(): void {
    console.log(this.numberFlight);
  }

  ngAfterViewInit(): void {
    this.showData();    
  }

}
