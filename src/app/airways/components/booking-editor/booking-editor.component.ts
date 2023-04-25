import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  private calcWidthInput(input: string): string {
    return `${String(input.length * 10)}px`;
  }

  ngOnInit(): void {
    this.widthInput.from = this.calcWidthInput(this.inputs.from);
    this.widthInput.to = this.calcWidthInput(this.inputs.to);
  }

}
