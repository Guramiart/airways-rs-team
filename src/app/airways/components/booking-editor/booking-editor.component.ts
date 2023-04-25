import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BookingEditorComponent {

  public adult = 0;

  public child = 0;

  public infant = 0;

}
