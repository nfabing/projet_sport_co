import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheProfilPage } from './recherche-profil.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheProfilPageRoutingModule {}
