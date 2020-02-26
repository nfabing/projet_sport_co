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
  },
  {
    path: 'player-search-results',
    loadChildren: () => import('./player-search-results/player-search-results.module').then( m => m.PlayerSearchResultsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'club-register',
    loadChildren: () => import('./club-register/club-register.module').then( m => m.ClubRegisterPageModule)
  },
  {
    path: 'fil-actu',
    loadChildren: () => import('./fil-actu/fil-actu.module').then( m => m.FilActuPageModule)
  },
  {
    path: 'login-club',
    loadChildren: () => import('./login-club/login-club.module').then( m => m.LoginClubPageModule)
  },
  {
    path: 'login-player',
    loadChildren: () => import('./login-player/login-player.module').then( m => m.LoginPlayerPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  }
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
