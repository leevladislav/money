import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesPageComponent} from './expenses-page.component';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesPageComponent,
    children: [
      {
        path: '',
        component: ExpensesListComponent
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
