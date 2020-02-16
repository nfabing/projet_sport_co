import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ModalPlayerCvPageRoutingModule } from './modal-player-cv-routing.module';

import { ModalPlayerCvPage } from './modal-player-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPlayerCvPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalPlayerCvPage],
  entryComponents: [ModalPlayerCvPage]
})
export class ModalPlayerCvPageModule {}
