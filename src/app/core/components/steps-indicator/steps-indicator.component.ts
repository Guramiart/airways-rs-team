import { Component } from '@angular/core';

enum StepsLinksImage {
  edit = 'assets/pencile.svg',
  change = 'assets/chandge.svg',
  second = 'assets/second.svg',
  third = 'assets/third.svg',
}

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrls: ['./steps-indicator.component.scss'],
})
export class StepsIndicatorComponent {

  public stepImage = {
    first: StepsLinksImage.edit,
    second: StepsLinksImage.second,
    third: StepsLinksImage.third,
  };

}
