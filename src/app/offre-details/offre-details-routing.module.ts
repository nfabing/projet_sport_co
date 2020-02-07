import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreDetailsPage } from './offre-details.page';

const routes: Routes = [
  {
    path: '',
    component: OffreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreDetailsPageRoutingModule {}
