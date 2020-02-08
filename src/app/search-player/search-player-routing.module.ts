import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlayerPage } from './search-player.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlayerPageRoutingModule {}
