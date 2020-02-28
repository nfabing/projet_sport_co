import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubProfilPage } from './club-profil.page';

const routes: Routes = [
  {
    path: '',
    component: ClubProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubProfilPageRoutingModule {}
