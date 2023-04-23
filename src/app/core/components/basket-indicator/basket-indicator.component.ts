import { Component, OnInit } from '@angular/core';
import { HeaderChangerService } from '../../services/header-changer.service';

enum IconLinks {
  white = 'assets/basketWhite.svg',
  black = 'assets/basketBlack.svg',
}

@Component({
  selector: 'app-basket-indicator',
  templateUrl: './basket-indicator.component.html',
  styleUrls: ['./basket-indicator.component.scss'],
})
export class BasketIndicatorComponent implements OnInit {

  public isBasketCounter = false;

  public basketCounter = '0';

  public basketIcon: IconLinks = IconLinks.white;

  constructor(private mainObserver: HeaderChangerService) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe(() => this.onChange());
  }

  private onChange(): void {
    this.basketIcon = this.basketIcon === IconLinks.white ? IconLinks.black : IconLinks.white;
  }

}
