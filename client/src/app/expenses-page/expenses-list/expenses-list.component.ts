import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {CategoriesService} from '../../shared/services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {SelectWalletComponent} from '../../shared-modules/select-wallet/select-wallet.component';
import {WalletsService} from '../../shared/services/wallets.service';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category} from '../../shared/interfaces/categories.interfaces';
import {filter} from 'rxjs/operators';
import {EnterExpenseComponent} from '../../shared-modules/enter-expense/enter-expense.component';
import {Expense} from '../../shared/interfaces/expenses.interfaces';
import {ExpensesService} from '../../shared/services/expenses.service';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  wallets: Wallet[] = [];
  categories: Category[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private walletsService: WalletsService,
    private expensesService: ExpensesService,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getWallets();
  }

  getCategories(): void {
    const categoriesSub = this.categoriesService.categories$
      .subscribe((categories: Category[]) => this.categories = [...categories || []]);

    this.subscriptions.push(categoriesSub);
  }

  getWallets(): void {
    const walletsSub = this.walletsService.wallets$
      .subscribe((wallets: Wallet[]) => this.wallets = [...wallets || []]);

    this.subscriptions.push(walletsSub);
  }

  selectWallet(selectedCategory: Category): void {
    const dialogRef = this.dialog.open(SelectWalletComponent, {
      data: this.wallets,
      panelClass: ['primary-modal', 'modal-md'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .pipe(filter((selectedWallet) => selectedWallet))
      .subscribe((selectedWallet: Wallet) => this.enterExpense(selectedWallet, selectedCategory));

    this.subscriptions.push(dialogRefSub);
  }

  enterExpense(selectedWallet: Wallet, selectedCategory: Category): void {
    const dialogRef = this.dialog.open(EnterExpenseComponent, {
      data: selectedWallet,
      panelClass: ['primary-modal', 'modal-md'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .pipe(filter((expense) => expense))
      .subscribe((expense: Expense) => this.createExpenses(selectedWallet, selectedCategory, expense));

    this.subscriptions.push(dialogRefSub);
  }

  createExpenses(selectedWallet: Wallet, selectedCategory: Category, enteredExpense: Expense): void {
    const data = {
      ...enteredExpense,
      wallet: selectedWallet._id,
      category: selectedCategory._id,
    };

    const createExpensesSub = this.expensesService.create(data)
      .subscribe(
        (expense: Expense) => {
          this.walletsService.walletsUpdated$.next(true);
          this.expensesService.expensesUpdated$.next(true);
          this.openModalService.openModal(expense, null, 'Expense successfully added');
        },
        (error) => this.openModalService.openModal(null, error.error.message)
      );

    this.subscriptions.push(createExpensesSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
