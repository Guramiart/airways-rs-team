import { IPassengerInfo } from './passengerInfo.model';

export interface Passengers {
  passengers: {
    adult: PassengerDetail,
    child: PassengerDetail,
    infant: PassengerDetail,
  },
  total: number,
  contactDetails?:{
    email:string;
    mobile:string;
  }
}

export interface PassengersCost {
  adult: Cost,
  child: Cost,
  infant: Cost,
  total: number
}

export interface PassengerDetail {
  name: string,
  count: number,
  info?:IPassengerInfo[]
}

export interface Cost {
  total: number,
  fare: number,
  tax: number,
}
