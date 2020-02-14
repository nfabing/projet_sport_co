import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { IonicModule } from '@ionic/angular';

import { SearchOfferPageRoutingModule } from './search-offer-routing.module';

import { SearchOfferPage } from './search-offer.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchOfferPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [SearchOfferPage]
})
export class SearchOfferPageModule {}
