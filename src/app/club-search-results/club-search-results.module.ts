import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubSearchResultsPageRoutingModule } from './club-search-results-routing.module';

import { ClubSearchResultsPage } from './club-search-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubSearchResultsPageRoutingModule
  ],
  declarations: [ClubSearchResultsPage]
})
export class ClubSearchResultsPageModule {}
