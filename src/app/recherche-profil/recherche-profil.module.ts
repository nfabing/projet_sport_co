import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechercheProfilPageRoutingModule } from './recherche-profil-routing.module';

import { RechercheProfilPage } from './recherche-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechercheProfilPageRoutingModule
  ],
  declarations: [RechercheProfilPage]
})
export class RechercheProfilPageModule {}
