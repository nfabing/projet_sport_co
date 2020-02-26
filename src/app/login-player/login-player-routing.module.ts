import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPlayerPage } from './login-player.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPlayerPageRoutingModule {}
