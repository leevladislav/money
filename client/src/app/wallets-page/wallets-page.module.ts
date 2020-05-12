import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletsPageRoutingModule} from './wallets-page.routing.module';
import {WalletsPageComponent} from './wallets-page.component';
import {WalletsListComponent} from './wallets-list/wallets-list.component';
import {WalletComponent} from './wallet/wallet.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    WalletsListComponent,
    WalletComponent,
    WalletsPageComponent
  ],
  imports: [
    CommonModule,
    WalletsPageRoutingModule,
    SharedModule
  ]
})
export class WalletsPageModule {
}
