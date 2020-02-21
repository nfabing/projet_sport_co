import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubRegisterPageRoutingModule } from './club-register-routing.module';

import { ClubRegisterPage } from './club-register.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ClubRegisterPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ClubRegisterPage]
})
export class ClubRegisterPageModule {}
