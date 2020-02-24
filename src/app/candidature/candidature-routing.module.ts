import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidaturePage } from './candidature.page';

const routes: Routes = [
  {
    path: '',
    component: CandidaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidaturePageRoutingModule {}
