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

  public isSteps = false;

  public backgroundColor = BgColor.grey;

  constructor(private mainObserver: HeaderChangerService) {
  }

  public checkPage(): void {
    this.isSteps = !this.isSteps;
    this.backgroundColor = this.backgroundColor === BgColor.grey ? BgColor.white : BgColor.grey;
  }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.checkPage());
  }

}
