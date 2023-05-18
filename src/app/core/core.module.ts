import { NgModule, isDevMode } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { DateChooseComponent } from './components/date-choose/date-choose.component';
import { CurrencyChooseComponent } from './components/currency-choose/currency-choose.component';
import { AccountButtonComponent } from './components/account-button/account-button.component';
import { BasketIndicatorComponent } from './components/basket-indicator/basket-indicator.component';
import { StepsIndicatorComponent } from './components/steps-indicator/steps-indicator.component';

import { settingReducer } from '../redux/reducers/settings.reducer';
import { flightReducer } from '../redux/reducers/flight.reducer';
import { HeaderChangerService } from './services/header-changer.service';
import { StepperService } from './services/stepper-service.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateChooseComponent,
    CurrencyChooseComponent,
    AccountButtonComponent,
    BasketIndicatorComponent,
    StepsIndicatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CdkAccordionModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({ flights: flightReducer, settings: settingReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    RouterLink,
    NgOptimizedImage,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [HeaderChangerService, StepperService],
})
export class CoreModule { }
