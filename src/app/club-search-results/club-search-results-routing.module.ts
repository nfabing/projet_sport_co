import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubSearchResultsPage } from './club-search-results.page';

const routes: Routes = [
  {
    path: '',
    component: ClubSearchResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubSearchResultsPageRoutingModule {}
