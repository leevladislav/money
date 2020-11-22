import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesPageRoutingModule} from './expenses-page.routing.module';
import {ExpensesPageComponent} from './expenses-page.component';
import {SharedModule} from '../shared/shared.module';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';
import {EnterExpenseModule} from '../shared-modules/enter-expense/enter-expense.module';
import {SelectWalletModule} from '../shared-modules/select-wallet/select-wallet.module';


@NgModule({
  declarations: [
    ExpensesPageComponent,
    ExpensesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExpensesPageRoutingModule,
    EnterExpenseModule,
    SelectWalletModule
  ]
})
export class ExpensesPageModule {
}
