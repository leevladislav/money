import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';

@Component({
  selector: 'app-modal-select-wallet',
  templateUrl: './select-wallet.component.html',
  styleUrls: ['./select-wallet.component.scss']
})
export class SelectWalletComponent implements OnInit {
  constructor(
    public modal: MatDialogRef<SelectWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wallet[]
  ) {
  }

  ngOnInit(): void {
  }

  selectWallet(wallet: Wallet): void {
    this.modal.close(wallet);
  }
}
