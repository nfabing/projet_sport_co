import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchClubPage } from './search-club.page';

const routes: Routes = [
  {
    path: '',
    component: SearchClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchClubPageRoutingModule {}
