import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesPageComponent} from './expenses-page.component';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';
import {SelectWalletComponent} from './select-wallet/select-wallet.component';
import {EnterExpenseComponent} from './enter-expense/enter-expense.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesPageComponent,
    children: [
      {
        path: '',
        component: ExpensesListComponent
      },
      {
        path: ':categoryId',
        component: SelectWalletComponent
      },
      {
        path: ':categoryId/:walletId',
        component: EnterExpenseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExpensesPageRoutingModule {
}
