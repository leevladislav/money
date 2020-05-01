import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page.component';
import {CategoryComponent} from './category/category.component';
import {PositionComponent} from './positions-list/position/position.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WalletComponent} from './wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'wallet/create',
        component: WalletComponent
      },
      {
        path: 'wallet/:id/edit',
        component: WalletComponent
      },
      {
        path: 'category/create',
        component: CategoryComponent
      },
      {
        path: 'category/:id/edit',
        component: CategoryComponent
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

export class HomePageRoutingModule {
}
