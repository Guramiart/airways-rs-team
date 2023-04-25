import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BookingEditorComponent implements OnInit {

  public adult = 0;

  public child = 0;

  public infant = 0;

  public inputs = {
    from: 'Dublin',
    to: 'Warsaw Modlin',
  };

  public codes = {
    from: 'DUB',
    to: 'WAW',
  };

  public widthInput = {
    from: '0px',
    to: '0px',
  };

  public passengerList: string | undefined;

  public formDate!: FormGroup;

  ngOnInit(): void {
    this.widthInput.from = this.calcWidthInput(this.inputs.from);
    this.widthInput.to = this.calcWidthInput(this.inputs.to);
    this.generatePassengerList();
    this.formDate = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  }

  public adultCounter(marker: boolean): void {
    if (marker) {
      this.adult += 1;
    } else {
      this.adult = this.adult ? this.adult - 1 : this.adult;
    }

    this.generatePassengerList();
  }

  public childCounter(marker: boolean): void {
    if (marker) {
      this.child += 1;
    } else {
      this.child = this.child ? this.child - 1 : this.child;
    }

    this.generatePassengerList();
  }

  public infantsCounter(marker: boolean): void {
    if (marker) {
      this.infant += 1;
    } else {
      this.infant = this.infant ? this.infant - 1 : this.infant;
    }

    this.generatePassengerList();
  }

  private calcWidthInput(input: string): string {
    return `${String(input.length * 10)}px`;
  }

  private generatePassengerList(): void {
    this.passengerList = '';
    if (this.adult) {
      this.passengerList = `${this.adult} Adult`;
    }

    if (this.child) {
      if (this.adult) {
        this.passengerList = `${this.passengerList} ,${this.child} Child`;
      } else {
        this.passengerList = `${this.child} Child`;
      }
    }

    if (this.infant) {
      if (this.passengerList.length) {
        this.passengerList = `${this.passengerList} ,${this.infant} Infants`;
      } else {
        this.passengerList = `${this.infant} Infants`;
      }
    }
  }

}
