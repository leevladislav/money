import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-page.routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {HomePageComponent} from './home-page.component';
import {CategoryComponent} from './categories-list/category/category.component';
import {SharedModule} from '../shared/shared.module';
import {PositionsListComponent} from './positions-list/positions-list.component';
import {PositionComponent} from './positions-list/position/position.component';


@NgModule({
  declarations: [
    HomePageComponent,
    CategoriesListComponent,
    CategoryComponent,
    PositionsListComponent,
    PositionComponent,
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
