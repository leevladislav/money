import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryInfoComponent} from './history-list/history-info/history-info.component';
import {HistoryPageComponent} from './history-page.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
    children: [
      {
        path: '',
        component: HistoryListComponent
      },
      {
        path: ':id',
        component: HistoryInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HistoryPageRoutingModule {
}
