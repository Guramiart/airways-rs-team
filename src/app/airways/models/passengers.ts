import { IPassengerInfo } from "./passengerInfo.model"
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
