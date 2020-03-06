import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
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
  /*{
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then( m => m.ApplicationsPageModule)
  },*/
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
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'legalnotice',
    loadChildren: () => import('./legalnotice/legalnotice.module').then( m => m.LegalnoticePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'recherche-profil/:id_user',
    loadChildren: () => import('./recherche-profil/recherche-profil.module').then( m => m.RechercheProfilPageModule)
  },
  {
    path: 'recherche-club/:id_club',
    loadChildren: () => import('./recherche-club/recherche-club.module').then( m => m.RechercheClubPageModule)
  },
  {
    path: 'player-profil',
    loadChildren: () => import('./player-profil/player-profil.module').then( m => m.PlayerProfilPageModule)
  },
  {
    path: 'player-cv',
    loadChildren: () => import('./player-cv/player-cv.module').then( m => m.PlayerCvPageModule)
  },
  {
    path: 'club-profil',
    loadChildren: () => import('./club-profil/club-profil.module').then( m => m.ClubProfilPageModule)
  },
  {
    path: 'candidature',
    loadChildren: () => import('./candidature/candidature.module').then( m => m.CandidaturePageModule)
  },
  {
    path: 'page-candidature',
    loadChildren: () => import('./page-candidature/page-candidature.module').then( m => m.PageCandidaturePageModule)
  },
  {
    path: 'ajout-offre/:id_club',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
