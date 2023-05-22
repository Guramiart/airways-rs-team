import {
  Directive, DoCheck, ElementRef, Input, Renderer2,
} from '@angular/core';
import { Seats } from 'src/app/services/flight.model';

@Directive({
  selector: '[appSeats]',
})
export class SeatsDirective implements DoCheck {

  @Input() appSeats: Seats | undefined;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngDoCheck(): void {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', this.getColor());
  }

  private getColor(): string {

    if (this.appSeats) {
      const { total } = this.appSeats;
      const available = this.appSeats.avaible;

      if ((available / total) * 100 < 10) {
        return 'rgba(255, 0, 0, 0.3)';
      }
      if ((total / 2) < available) {
        return 'rgba(0, 128, 0, 0.3)';
      }
      return 'rgba(241, 201, 51, 0.3)';
    }

    return 'white';
  }

}
