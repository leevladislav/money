import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-income',
  templateUrl: './modal-add-income.component.html',
  styleUrls: ['./modal-add-income.component.scss']
})
export class ModalAddIncomeComponent implements OnInit {
  selectedWalletId: number | any;

  constructor(
    public modal: MatDialogRef<ModalAddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    console.log(this.data.wallets);
  }

  selectWallet(walletId) {
    if (this.selectedWalletId === walletId) {
      this.selectedWalletId = null;
      return;
    }

    this.selectedWalletId = walletId;
  }

  addIncome() {
    // TODO: add income
    this.modal.close();
  }
}
