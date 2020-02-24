import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'candidature',
    loadChildren: () => import('./candidature/candidature.module').then( m => m.CandidaturePageModule)
  },
  {
    path: 'page-candidature/:id',
    loadChildren: () => import('./page-candidature/page-candidature.module').then( m => m.PageCandidaturePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
