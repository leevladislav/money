import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-page.routing.module';
import {CategoriesComponent} from './dashboard/categories/categories.component';
import {HomePageComponent} from './home-page.component';
import {CategoryComponent} from './category/category.component';
import {SharedModule} from '../shared/shared.module';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {PositionComponent} from './positions-list/position/position.component';
import {WalletsComponent} from './dashboard/wallets/wallets.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CategoriesComponent,
    CategoryComponent,
    PositionsListComponent,
    PositionComponent,
    WalletsComponent,
    DashboardComponent,
    WalletComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule
  ],
  exports: [
    PositionsListComponent
  ]
})
export class HomePageModule {
}
