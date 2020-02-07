import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreDetailsPageRoutingModule } from './offre-details-routing.module';

import { OffreDetailsPage } from './offre-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffreDetailsPageRoutingModule
  ],
  declarations: [OffreDetailsPage]
})
export class OffreDetailsPageModule {}
