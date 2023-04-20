import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { DateChooseComponent } from './components/date-choose/date-choose.component';
import { CurrencyChooseComponent } from './components/currency-choose/currency-choose.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateChooseComponent,
    CurrencyChooseComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatExpansionModule,
    MatSelectModule,
    CdkAccordionModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
