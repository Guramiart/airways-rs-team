import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

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

  constructor(private detector: ChangeDetectorRef) {
    this.detector.detach();
  }

  public showData(): void {
    this.numberFlight = this.inputData.numberFlight;
    this.flight = this.inputData.flight;
    this.type = this.inputData.type;
    this.date = this.inputData.date;
    this.passengers = this.inputData.passengers;
    this.price = this.inputData.price;
  }

  ngAfterViewInit(): void {
    this.showData();
    this.detector.detectChanges();
  }

}
