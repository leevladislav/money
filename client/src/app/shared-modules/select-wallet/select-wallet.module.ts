import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectWalletComponent} from './select-wallet.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    SelectWalletComponent
  ],
  entryComponents: [
    SelectWalletComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SelectWalletComponent
  ]
})
export class SelectWalletModule {
}
