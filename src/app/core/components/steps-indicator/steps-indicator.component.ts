import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StepperService } from '../../services/stepper-service.service';

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
export class StepsIndicatorComponent implements OnInit, OnDestroy {

  public first: StepsLinksImage = StepsLinksImage.edit;

  public second: StepsLinksImage = StepsLinksImage.second;

  public third: StepsLinksImage = StepsLinksImage.third;

  private stepperObserver: Subscription;

  constructor(private stepperSwitcher: StepperService) {
  }

  ngOnDestroy(): void {
    this.stepperObserver.unsubscribe();
  }

  ngOnInit(): void {
    this.stepperObserver = this.stepperSwitcher.stepperEmmit.subscribe((view: string): void => {
      switch (view) {
        case 'second':
          this.first = StepsLinksImage.change;
          this.second = StepsLinksImage.edit;
          this.third = StepsLinksImage.third;
          break;
        case 'third':
          this.first = StepsLinksImage.change;
          this.second = StepsLinksImage.change;
          this.third = StepsLinksImage.edit;
          break;
        default:
          this.first = StepsLinksImage.edit;
          this.second = StepsLinksImage.second;
          this.third = StepsLinksImage.third;
          break;
      }
    });
  }

}
