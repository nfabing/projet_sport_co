import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubRegisterPage } from './club-register.page';

const routes: Routes = [
  {
    path: '',
    component: ClubRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRegisterPageRoutingModule {}
