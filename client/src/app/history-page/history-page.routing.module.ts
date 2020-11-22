import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryComponent} from './history-list/history/history.component';
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
        component: HistoryComponent
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
