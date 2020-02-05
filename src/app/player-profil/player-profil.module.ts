import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerProfilPageRoutingModule } from './player-profil-routing.module';

import { PlayerProfilPage } from './player-profil.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayerProfilPageRoutingModule
  ],
  declarations: [PlayerProfilPage]
})
export class PlayerProfilPageModule {}
