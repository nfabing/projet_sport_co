import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'player-profil',
    loadChildren: () => import('./player-profil/player-profil.module').then( m => m.PlayerProfilPageModule)
  },
  {
    path: 'player-cv',
    loadChildren: () => import('./player-cv/player-cv.module').then( m => m.PlayerCvPageModule)
  },  {
    path: 'club-profil',
    loadChildren: () => import('./club-profil/club-profil.module').then( m => m.ClubProfilPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
