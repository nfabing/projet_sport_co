import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClubProfilPageRoutingModule } from './club-profil-routing.module';

import { ClubProfilPage } from './club-profil.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClubProfilPageRoutingModule
  ],
  declarations: [ClubProfilPage]
})
export class ClubProfilPageModule {}
