import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginClubPage } from './login-club.page';

const routes: Routes = [
  {
    path: '',
    component: LoginClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginClubPageRoutingModule {}
