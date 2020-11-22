import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryPageComponent} from './history-page.component';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryFilterComponent} from './history-filter/history-filter.component';
import {SharedModule} from '../shared/shared.module';
import {HistoryPageRoutingModule} from './history-page.routing.module';
import {HistoryComponent} from './history-list/history/history.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryPageRoutingModule
  ]
})
export class HistoryPageModule {
}
