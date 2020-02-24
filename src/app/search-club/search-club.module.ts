import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { IonicModule } from '@ionic/angular';

import { SearchClubPageRoutingModule } from './search-club-routing.module';

import { SearchClubPage } from './search-club.page';

@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        ReactiveFormsModule,
        IonicModule,
        SearchClubPageRoutingModule,
        NgxDatatableModule
    ],
    declarations: [SearchClubPage]
})
export class SearchClubPageModule {}
