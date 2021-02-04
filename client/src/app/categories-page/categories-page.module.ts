import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesPageRoutingModule} from './categories-page.routing.module';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesPageComponent} from './categories-page.component';
import {CategoryComponent} from './category/category.component';
import {SharedModule} from '../shared/shared.module';
import {SelectIconModule} from '../shared-modules/select-icon/select-icon.module';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesPageComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesPageRoutingModule,
    SharedModule,
    SelectIconModule
  ]
})
export class CategoriesPageModule {
}
