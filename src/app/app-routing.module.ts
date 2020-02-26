import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search-player',
    loadChildren: () => import('./search-player/search-player.module').then( m => m.SearchPlayerPageModule)
  },
  {
    path: 'search-offer',
    loadChildren: () => import('./search-offer/search-offer.module').then( m => m.SearchOfferPageModule)
  },
  {
    path: 'search-club',
    loadChildren: () => import('./search-club/search-club.module').then( m => m.SearchClubPageModule)
  },
  {
    path: 'legalnotice',
    loadChildren: () => import('./legalnotice/legalnotice.module').then( m => m.LegalnoticePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
