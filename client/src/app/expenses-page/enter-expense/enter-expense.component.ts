import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {unsubscribe} from '../../utils/unsubscriber';
import * as moment from 'moment';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {WalletsService} from '../../shared/services/wallets.service';
import {Expense} from '../../shared/interfaces/expenses.interfaces';
import {ExpensesService} from '../../shared/services/expenses.service';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Category} from '../../shared/interfaces/categories.interfaces';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-enter-expense',
  templateUrl: './enter-expense.component.html',
  styleUrls: ['./enter-expense.component.scss']
})
export class EnterExpenseComponent implements OnInit, OnDestroy {
  form: FormGroup;
  category: Category;
  wallet: Wallet;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private walletsService: WalletsService,
    private categoriesService: CategoriesService,
    private expensesService: ExpensesService,
    private openModalService: OpenModalInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    const routeSub = this.route.params.subscribe((params: Params) => {
      this.getWallet(params.walletId);
      this.getCategory(params.categoryId);
    });

    this.subscriptions.push(routeSub);
  }

  initForm(): void {
    this.form = this.fb.group({
      expense: [null, [Validators.required]],
      description: [null]
    });
  }

  getWallet(walletId): void {
    const getWalletSub = this.walletsService.getById(walletId)
      .subscribe(
        (wallet: Wallet) => this.wallet = wallet,
        () => this.router.navigate(['/expenses'])
    );

    this.subscriptions.push(getWalletSub);
  }

  getCategory(categoryId: string): void {
    const getCategorySub = this.categoriesService.getById(categoryId)
      .subscribe(
        (category: Category) => this.category = category,
        () => this.router.navigate(['/expenses'])
      );

    this.subscriptions.push(getCategorySub);
  }

  onEnterExpenses(): void {
    const data = {
      ...this.form.value,
      date: moment().format('DD.MM.YYYY'),
      wallet: this.wallet._id,
      category: this.category._id,
    };

    this.createExpenses(data);
  }

  createExpenses(data): void {
    const createExpensesSub = this.expensesService.create(data)
      .subscribe(
        (expense: Expense) => {
          this.walletsService.walletsUpdated$.next(true);
          this.expensesService.expensesUpdated$.next(true);
          this.openModalService.openModal(expense, null, 'Expense successfully added', '/expenses');
        },
        (error) => this.openModalService.openModal(null, error.error.message)
      );

    this.subscriptions.push(createExpensesSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
