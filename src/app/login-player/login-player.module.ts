import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPlayerPageRoutingModule } from './login-player-routing.module';

import { LoginPlayerPage } from './login-player.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPlayerPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [LoginPlayerPage]
})
export class LoginPlayerPageModule {}
