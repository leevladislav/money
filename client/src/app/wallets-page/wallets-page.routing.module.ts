import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WalletComponent} from './wallet/wallet.component';
import {WalletsPageComponent} from './wallets-page.component';
import {WalletsListComponent} from './wallets-list/wallets-list.component';

const routes: Routes = [
  {
    path: '',
    component: WalletsPageComponent,
    children: [
      {
        path: '',
        component: WalletsListComponent
      },
      {
        path: 'create',
        component: WalletComponent
      },
      {
        path: ':id/edit',
        component: WalletComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WalletsPageRoutingModule {
}
