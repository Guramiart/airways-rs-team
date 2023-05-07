import {
  AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { CartSwitcherService } from 'src/app/airways/services/cart-switcher.service';
import { Subscription } from 'rxjs';
import { OneTicket } from '../../enums/tickets-data';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.scss'],
})
export class TableRecordComponent implements OnInit, AfterViewChecked, OnDestroy {

  public isShoppingRecord: boolean;

  public numberFlight: string;

  public flight: string[];

  public type: string;

  public date: string[];

  public passengers: string[];

  public price: string;

  public inputData: OneTicket;

  public check: boolean = false;

  private selectAllObserver: Subscription;

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
  }

  public onChecked(): void {
    this.switcher.selectionEv({ checked: this.check, flight: this.numberFlight });
  }

  public deleteItem(): void {
    this.switcher.deleteEv(this.numberFlight);
  }

  public editItem(): void {
    console.info('This need to paste routing for edit page!!!');
  }

  ngAfterViewChecked(): void {
    this.showData();
    this.detector.detectChanges();
  }

  ngOnInit(): void {
    this.selectAllObserver = this.switcher.selectAll.subscribe((marker) => {
      this.check = marker;
      this.detector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.selectAllObserver.unsubscribe();
  }

}
