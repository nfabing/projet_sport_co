import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheClubPage } from './recherche-club.page';

const routes: Routes = [
  {
    path: '',
    component: RechercheClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechercheClubPageRoutingModule {}
