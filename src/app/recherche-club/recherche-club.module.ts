import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheClubPageRoutingModule } from './recherche-club-routing.module';

import { RechercheClubPage } from './recherche-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheClubPageRoutingModule
  ],
  declarations: [RechercheClubPage]
})
export class RechercheClubPageModule {}
