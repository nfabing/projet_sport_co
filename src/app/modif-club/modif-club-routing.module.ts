import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifClubPage } from './modif-club.page';

const routes: Routes = [
  {
    path: '',
    component: ModifClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifClubPageRoutingModule {}
