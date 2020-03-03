import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'batch-geocoding', pathMatch: 'full' },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'geocoding',
    loadChildren: () => import('./pages/geocoding/geocoding.module').then( m => m.GeocodingPageModule)
  },
  {
    path: 'batch-geocoding',
    loadChildren: () => import('./pages/batch-geocoding/batch-geocoding.module').then( m => m.BatchGeocodingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
