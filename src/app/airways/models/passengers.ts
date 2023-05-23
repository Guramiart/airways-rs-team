import { IPassengerInfo } from './passengerInfo.model';

export interface Passengers {
  passengers: {
    adult: {
      name: string,
      count: number,
      info?:IPassengerInfo[]
    },
    child: {
      name: string,
      count: number,
      info?:IPassengerInfo[]
    },
    infant: {
      name: string,
      count: number,
      info?:IPassengerInfo[]
    },
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

export interface Cost {
  total: number,
  fare: number,
  tax: number,
}
