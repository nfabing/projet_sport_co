import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifClubPageRoutingModule } from './modif-club-routing.module';

import { ModifClubPage } from './modif-club.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifClubPageRoutingModule
  ],
  declarations: [ModifClubPage]
})
export class ModifClubPageModule {}
