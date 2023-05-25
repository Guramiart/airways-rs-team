import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './airways/pages/main-page/main-page.component';
import { ShoppingCartPageComponent } from './airways/pages/shopping-cart-page/shopping-cart-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { StoreGuardService } from './services/store-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      headerView: {
        bgColor: false,
        showStepper: false,
      },
    },
  },
  {
    path: 'step',
    pathMatch: 'prefix',
    loadChildren: () => import('./airways/booking-router.module').then((m) => m.BookingRoutingModule),
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: ShoppingCartPageComponent,
    canActivate: [AuthGuardService],
    data: {
      cart: true,
      headerView: {
        bgColor: true,
        showStepper: null,
      },
    },
  },
  {
    path: 'account',
    pathMatch: 'full',
    component: ShoppingCartPageComponent,
    canActivate: [AuthGuardService, StoreGuardService],
    data: {
      cart: false,
      headerView: {
        bgColor: true,
        showStepper: null,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
