import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowEditorService } from '../../services/show-editor.service';
import { HeaderChangerService } from '../../../core/services/header-changer.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  animations: [
    trigger('showEditor', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.7s', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('0.7s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class BookingPageComponent implements OnInit, OnDestroy {

  public isEditor = false;

  private observeForEditBtn: Subscription | undefined;

  constructor(
    private router: Router,
    private observe: ShowEditorService,
    private headerChange: HeaderChangerService,
    private routeInfo: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.routeInfo.data.subscribe((data) => {
      this.headerChange.changePage(data['headerView']);
    }).unsubscribe();
    this.observeForEditBtn = this.observe.emit.subscribe((): void => {
      this.isEditor = !this.isEditor;
    });
  }

  ngOnDestroy(): void {
    if (this.observeForEditBtn) this.observeForEditBtn.unsubscribe();
  }

  next(): void {
    this.router.navigateByUrl('/step/2');
  }

  back(): void {
    this.router.navigateByUrl('');
  }

}
