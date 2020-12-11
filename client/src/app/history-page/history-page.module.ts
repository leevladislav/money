import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryPageComponent} from './history-page.component';
import {HistoryListComponent} from './history-list/history-list.component';
import {HistoryFilterComponent} from './history-filter/history-filter.component';
import {SharedModule} from '../shared/shared.module';
import {HistoryPageRoutingModule} from './history-page.routing.module';
import {HistoryComponent} from './history-list/history/history.component';
import {HistoryEditComponent} from './history-edit/history-edit.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    HistoryComponent,
    HistoryEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryPageRoutingModule
  ],
  entryComponents: [
    HistoryEditComponent
  ]
})
export class HistoryPageModule {
}
