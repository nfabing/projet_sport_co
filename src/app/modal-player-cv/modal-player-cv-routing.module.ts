import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPlayerCvPage } from './modal-player-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPlayerCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPlayerCvPageRoutingModule {}
