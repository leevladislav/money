import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpensesPageComponent} from './expenses-page.component';
import {PositionComponent} from './positions-list/position/position.component';
import {ExpensesListComponent} from './expenses-list/expenses-list.component';

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
        path: ':id/edit/position/create',
        component: PositionComponent
      },
      {
        path: ':id/edit/position/:positionId/edit',
        component: PositionComponent
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
