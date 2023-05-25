import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private mainObserver: HeaderChangerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.mainObserver.onChangePage().subscribe((data) => {
      const { bgColor } = data;
      this.onChange(bgColor);
    });
  }

  private onChange(bgColor: boolean): void {
    this.basketIcon = bgColor ? IconLinks.black : IconLinks.white;
  }

  public cartRoute(): void {
    this.router.navigateByUrl('/cart');
  }

}
