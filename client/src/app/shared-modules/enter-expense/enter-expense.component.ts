import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-enter-expense',
  templateUrl: './enter-expense.component.html',
  styleUrls: ['./enter-expense.component.scss']
})
export class EnterExpenseComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public modal: MatDialogRef<EnterExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Wallet
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      expense: [null, [Validators.required, Validators.max(this.data.budget)]],
      description: [null]
    });
  }

  enterExpense(): void {
    this.modal.close({
      ...this.form.value,
      date: moment().format('DD.MM.YYYY')
    });
  }
}
