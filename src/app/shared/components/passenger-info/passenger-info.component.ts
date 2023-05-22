import { AfterViewInit, Component } from '@angular/core';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
})
export class PassengerInfoComponent implements AfterViewInit {

  public passengerName = '';

  public seatPlace: string | null = '';

  public isSeat: boolean = true;

  public passengerData: IPassengerInfo;

  private addPassengerData(): void {
    this.passengerName = this.passengerData.firstName;
    // this.seatPlace = this.passengerData.place;
    // this.isSeat = !!this.passengerData.place;
  }

  ngAfterViewInit(): void {
    this.addPassengerData();
  }

}
