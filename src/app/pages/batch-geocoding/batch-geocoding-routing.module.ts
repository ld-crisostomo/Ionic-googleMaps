import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchGeocodingPage } from './batch-geocoding.page';

const routes: Routes = [
  {
    path: '',
    component: BatchGeocodingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchGeocodingPageRoutingModule {}
