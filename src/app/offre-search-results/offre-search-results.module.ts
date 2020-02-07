import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreSearchResultsPageRoutingModule } from './offre-search-results-routing.module';

import { OffreSearchResultsPage } from './offre-search-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffreSearchResultsPageRoutingModule
  ],
  declarations: [OffreSearchResultsPage]
})
export class OffreSearchResultsPageModule {}
