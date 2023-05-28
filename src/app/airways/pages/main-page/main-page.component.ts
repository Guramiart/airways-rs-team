import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderChangerService } from '../../../core/services/header-changer.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  constructor(
    private hChanger: HeaderChangerService,
    private routeInfo: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeInfo.data.subscribe((data) => {
      this.hChanger.changePage(data['headerView']);
    }).unsubscribe();
  }

}
