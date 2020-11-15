import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnterExpenseComponent} from './enter-expense.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    EnterExpenseComponent
  ],
  entryComponents: [
    EnterExpenseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EnterExpenseComponent
  ]
})
export class EnterExpenseModule {
}
