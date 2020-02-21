import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'offre-details/:id',
    loadChildren: () => import('./offre-details/offre-details.module').then( m => m.OffreDetailsPageModule)
  },
  {
    path: 'offre-search-results',
    loadChildren: () => import('./offre-search-results/offre-search-results.module').then( m => m.OffreSearchResultsPageModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then( m => m.ApplicationsPageModule)
  },
  {
    path: 'club-search-results',
    loadChildren: () => import('./club-search-results/club-search-results.module').then( m => m.ClubSearchResultsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
