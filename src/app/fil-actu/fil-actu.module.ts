import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilActuPageRoutingModule } from './fil-actu-routing.module';

import { FilActuPage } from './fil-actu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilActuPageRoutingModule
  ],
  declarations: [FilActuPage]
})
export class FilActuPageModule {}
