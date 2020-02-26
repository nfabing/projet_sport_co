import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerSearchResultsPageRoutingModule } from './player-search-results-routing.module';

import { PlayerSearchResultsPage } from './player-search-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerSearchResultsPageRoutingModule
  ],
  declarations: [PlayerSearchResultsPage]
})
export class PlayerSearchResultsPageModule {}
