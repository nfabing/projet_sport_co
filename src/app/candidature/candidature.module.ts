import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandidaturePageRoutingModule } from './candidature-routing.module';

import { CandidaturePage } from './candidature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandidaturePageRoutingModule
  ],
  declarations: [CandidaturePage]
})
export class CandidaturePageModule {}
