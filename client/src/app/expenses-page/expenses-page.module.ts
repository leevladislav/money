import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesPageRoutingModule} from './expenses-page.routing.module';
import {ExpensesPageComponent} from './expenses-page.component';
import {SharedModule} from '../shared/shared.module';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {PositionComponent} from './positions-list/position/position.component';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';
import {ExpenseComponent} from './expense/expense.component';


@NgModule({
  declarations: [
    ExpensesPageComponent,
    PositionsListComponent,
    PositionComponent,
    ExpensesListComponent,
    ExpenseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExpensesPageRoutingModule
  ],
  exports: [
    PositionsListComponent
  ]
})
export class ExpensesPageModule {
}
