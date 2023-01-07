import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {
        path: 'setting',
        loadChildren: () => import('../setting/setting.module').then( m => m.SettingPageModule)
      },
      {
        path: 'download',
        loadChildren: () => import('../download/download.module').then( m => m.DownloadPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then( m => m.HistoryPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/download',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
