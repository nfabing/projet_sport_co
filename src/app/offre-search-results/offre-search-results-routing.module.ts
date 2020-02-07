import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreSearchResultsPage } from './offre-search-results.page';

const routes: Routes = [
  {
    path: '',
    component: OffreSearchResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreSearchResultsPageRoutingModule {}
