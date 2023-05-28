import { Component, OnInit } from '@angular/core';
import { HeaderChangerService } from '../../services/header-changer.service';

enum BgColor {
  grey = 'rgba(116, 118, 122, 0.2)',
  white = '#FAFAFA',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isSteps: boolean;

  public backgroundColor: BgColor;

  constructor(
    private mainObserver: HeaderChangerService,
  ) {
  }

  public checkPage(steps: boolean | null, bgColor: boolean): void {
    this.isSteps = steps;
    this.backgroundColor = bgColor ? BgColor.white : BgColor.grey;
  }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe((eventHeader) => {
      const { bgColor, showStepper } = eventHeader;
      this.checkPage(showStepper, bgColor);
    });
  }

}
