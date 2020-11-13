import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WalletsService} from '../../shared/services/wallets.service';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../../utils/unsubscriber';

@Component({
  selector: 'app-modal-add-income',
  templateUrl: './modal-add-income.component.html',
  styleUrls: ['./modal-add-income.component.scss']
})
export class ModalAddIncomeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedWallet: Wallet;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    public modal: MatDialogRef<ModalAddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private walletsService: WalletsService,
    private openModalService: OpenModalInfoService,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({budget: [null, [Validators.required]]});
    this.form.disable();
  }

  selectWallet(wallet) {
    if (this.selectedWallet && this.selectedWallet._id === wallet._id) {
      this.form.reset();
      this.form.disable();
      this.selectedWallet = null;

      return;
    }

    this.form.enable();
    this.selectedWallet = wallet;
  }

  addIncome() {
    const data = {
      _id: this.selectedWallet._id,
      name: this.selectedWallet.name,
      budget: this.form.value.budget
    };

    this.form.disable();

    const walletsSub = this.walletsService.addIncome(data)
      .subscribe(
        wallet => {
          this.openModalService.openModal(wallet, null, 'Income successfully added');
          this.updateAllWallets();
          this.form.enable();
          this.modal.close();
        },
        error => {
          this.openModalService.openModal(null, error.error.message);
          this.form.enable();
        });

    this.subscriptions.push(walletsSub);
  }

  updateAllWallets(): void {
    const fetchWalletsSub = this.walletsService.fetch()
      .subscribe((wallets: Wallet[]) => this.walletsService.throwWallets(wallets));

    this.subscriptions.push(fetchWalletsSub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
