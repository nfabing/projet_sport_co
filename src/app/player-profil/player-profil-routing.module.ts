import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerProfilPage } from './player-profil.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerProfilPageRoutingModule {}
