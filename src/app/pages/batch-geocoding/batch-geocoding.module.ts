import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatchGeocodingPageRoutingModule } from './batch-geocoding-routing.module';

import { BatchGeocodingPage } from './batch-geocoding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BatchGeocodingPageRoutingModule
  ],
  declarations: [BatchGeocodingPage]
})
export class BatchGeocodingPageModule {}
