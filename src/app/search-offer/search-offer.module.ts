import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchOfferPageRoutingModule } from './search-offer-routing.module';

import { SearchOfferPage } from './search-offer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchOfferPageRoutingModule
  ],
  declarations: [SearchOfferPage]
})
export class SearchOfferPageModule {}
