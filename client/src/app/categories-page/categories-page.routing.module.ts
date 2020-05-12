import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoriesPageComponent} from './categories-page.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
    children: [
      {
        path: '',
        component: CategoriesListComponent
      },
      {
        path: 'create',
        component: CategoryComponent
      },
      {
        path: ':id/edit',
        component: CategoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesPageRoutingModule {
}
