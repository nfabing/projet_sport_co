import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerCvPage } from './player-cv.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerCvPageRoutingModule {}
