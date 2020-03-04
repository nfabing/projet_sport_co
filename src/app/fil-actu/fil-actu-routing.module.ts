import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilActuPage } from './fil-actu.page';

const routes: Routes = [
  {
    path: '',
    component: FilActuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilActuPageRoutingModule {}
