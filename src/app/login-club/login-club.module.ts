import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginClubPageRoutingModule } from './login-club-routing.module';

import { LoginClubPage } from './login-club.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginClubPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [LoginClubPage]
})
export class LoginClubPageModule {}
