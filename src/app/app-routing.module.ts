import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'club-register',
    loadChildren: () => import('./club-register/club-register.module').then( m => m.ClubRegisterPageModule)
  },
  {
    path: 'fil-actu',
    loadChildren: () => import('./fil-actu/fil-actu.module').then( m => m.FilActuPageModule)
  },
  {
    path: 'login-club',
    loadChildren: () => import('./login-club/login-club.module').then( m => m.LoginClubPageModule)
  },
  {
    path: 'login-player',
    loadChildren: () => import('./login-player/login-player.module').then( m => m.LoginPlayerPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
