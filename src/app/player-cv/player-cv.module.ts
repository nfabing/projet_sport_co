import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerCvPageRoutingModule } from './player-cv-routing.module';
import { ModalPlayerCvPageModule } from '../modal-player-cv/modal-player-cv.module';
import { PlayerCvPage } from './player-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlayerCvPageRoutingModule,
    ModalPlayerCvPageModule
  ],
  declarations: [PlayerCvPage],
})
export class PlayerCvPageModule {}
