import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule } from '@ionic/angular';

import { SearchPlayerPageRoutingModule } from './search-player-routing.module';

import { SearchPlayerPage } from './search-player.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchPlayerPageRoutingModule,
    NgxDatatableModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [SearchPlayerPage]
})
export class SearchPlayerPageModule {}
