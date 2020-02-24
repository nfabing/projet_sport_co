import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCandidaturePageRoutingModule } from './page-candidature-routing.module';

import { PageCandidaturePage } from './page-candidature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCandidaturePageRoutingModule
  ],
  declarations: [PageCandidaturePage]
})
export class PageCandidaturePageModule {}
