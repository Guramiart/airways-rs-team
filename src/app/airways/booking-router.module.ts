import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { StoreGuardService } from '../services/store-guard.service';

const routes: Routes = [
  {
    path: '1',
    component: BookingPageComponent,
    canActivate: [StoreGuardService],
    data: {
      headerView: {
        bgColor: true,
        showStepper: true,
      },
      btnEditor: true,
    },
    children: [
      {
        path: '',
        component: FirstStepComponent,
        canActivate: [StoreGuardService],
        outlet: 'booking',
      },
    ],
  },
  {
    path: '2',
    component: BookingPageComponent,
    data: {
      headerView: {
        bgColor: true,
        showStepper: true,
      },
      btnEditor: false,
    },
    children: [
      {
        path: '',
        component: SecondStepComponent,
        canActivate: [AuthGuardService, StoreGuardService],
        outlet: 'booking',
      },
    ],
  },
  {
    path: '3',
    component: BookingPageComponent,
    canActivate: [AuthGuardService, StoreGuardService],
    data: {
      headerView: {
        bgColor: true,
        showStepper: true,
      },
      btnEditor: false,
    },
    children: [
      {
        path: '',
        component: SummaryPageComponent,
        canActivate: [AuthGuardService, StoreGuardService],
        outlet: 'booking',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule { }
