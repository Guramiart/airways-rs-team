import { Component } from '@angular/core';
import { ShowEditorService } from '../../services/show-editor.service';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})
export class BookingEditComponent {

  constructor(private emit: ShowEditorService) {
  }

  public showBookingEditor(): void {
    this.emit.showEditor();
  }

}
