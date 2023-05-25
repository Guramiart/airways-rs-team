import { Component } from '@angular/core';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
})
export class PassengerInfoComponent {

  public seatPlace: string = '';

  public isSeat: boolean = true;

  public passengerData: IPassengerInfo;

}
