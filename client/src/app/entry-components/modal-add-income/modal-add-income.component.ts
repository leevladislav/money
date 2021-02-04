import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {WalletsService} from '../../shared/services/wallets.service';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
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
    public modal: MatDialogRef<ModalAddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wallet[],
    private fb: FormBuilder,
    private walletsService: WalletsService,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({budget: [null, [Validators.required]]});
    this.form.disable();
  }

  selectWallet(wallet: Wallet): void {
    if (this.selectedWallet && this.selectedWallet._id === wallet._id) {
      this.form.reset();
      this.form.disable();
      this.selectedWallet = null;

      return;
    }

    this.form.enable();
    this.selectedWallet = wallet;
  }

  addIncome(): void {
    const data = {
      _id: this.selectedWallet._id,
      name: this.selectedWallet.name,
      budget: this.form.value.budget
    };

    this.form.disable();

    const walletsSub = this.walletsService.addIncome(data).subscribe(
      wallet => {
        this.form.enable();
        this.modal.close();
        this.walletsService.walletsUpdated$.next(true);
        this.openModalService.openModal(wallet, null, 'Income successfully added');
      },
      error => {
        this.openModalService.openModal(null, error.error.message);
        this.form.enable();
      });

    this.subscriptions.push(walletsSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
