import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SecondStepComponent } from './components/second-step/second-step.component';

const routes: Routes = [
  {
    path: '1',
    component: BookingPageComponent,
    children: [
      {
        path: '',
        component: FirstStepComponent,
        outlet: 'booking',
      },
    ],
  },
  {
    path: '2',
    component: BookingPageComponent,
    children: [
      {
        path: '',
        component: SecondStepComponent,
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
