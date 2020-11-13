import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';

@Component({
  selector: 'app-modal-select-wallet',
  templateUrl: './modal-select-wallet.component.html',
  styleUrls: ['./modal-select-wallet.component.scss']
})
export class ModalSelectWalletComponent implements OnInit {
  constructor(
    public modal: MatDialogRef<ModalSelectWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  selectWallet(wallet: Wallet): void {
    this.modal.close(wallet);
  }
}
