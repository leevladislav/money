import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';

@Component({
  selector: 'app-modal-select-wallet',
  templateUrl: './modal-select-wallet.component.html',
  styleUrls: ['./modal-select-wallet.component.scss']
})
export class ModalSelectWalletComponent implements OnInit {
  selectedWallet: Wallet;

  constructor(
    public modal: MatDialogRef<ModalSelectWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  selectWallet(wallet) {
    if (this.selectedWallet && this.selectedWallet._id === wallet._id) {
      this.selectedWallet = null;

      return;
    }

    this.selectedWallet = wallet;

    // _id: this.selectedWallet._id,
  }
}
