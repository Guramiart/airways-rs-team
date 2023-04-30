import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './airways/pages/main-page/main-page.component';
import { ShoppingCartPageComponent } from './airways/pages/shopping-cart-page/shopping-cart-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'step',
    pathMatch: 'prefix',
    loadChildren: () => import('./airways/booking-router.module').then((m) => m.BookingRoutingModule),
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: ShoppingCartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
