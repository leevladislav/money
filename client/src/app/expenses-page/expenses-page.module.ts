import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesPageRoutingModule} from './expenses-page.routing.module';
import {ExpensesPageComponent} from './expenses-page.component';
import {SharedModule} from '../shared/shared.module';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';
import {SelectWalletModule} from '../shared-modules/select-wallet/select-wallet.module';
import {SelectWalletComponent} from './select-wallet/select-wallet.component';
import { EnterExpenseComponent } from './enter-expense/enter-expense.component';


@NgModule({
  declarations: [
    ExpensesPageComponent,
    ExpensesListComponent,
    SelectWalletComponent,
    EnterExpenseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExpensesPageRoutingModule,
    SelectWalletModule
  ]
})
export class ExpensesPageModule {
}
