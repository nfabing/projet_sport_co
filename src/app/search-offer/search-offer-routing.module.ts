import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchOfferPage } from './search-offer.page';

const routes: Routes = [
  {
    path: '',
    component: SearchOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchOfferPageRoutingModule {}
