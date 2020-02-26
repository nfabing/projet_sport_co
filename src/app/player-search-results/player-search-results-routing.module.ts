import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerSearchResultsPage } from './player-search-results.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerSearchResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerSearchResultsPageRoutingModule {}
