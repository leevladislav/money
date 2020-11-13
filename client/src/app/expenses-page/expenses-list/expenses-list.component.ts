import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {CategoriesService} from '../../shared/services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalSelectWalletComponent} from '../../entry-components/modal-select-wallet/modal-select-wallet.component';
import {WalletsService} from '../../shared/services/wallets.service';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category} from '../../shared/interfaces';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  wallets: Wallet[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private walletsService: WalletsService
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
    this.getWallets();
  }

  getWallets(): void {
    const walletsSub = this.walletsService.wallets$
      .subscribe((wallets: Wallet[]) => this.wallets = [...wallets || []]);

    this.subscriptions.push(walletsSub);
  }

  selectWallet(category: Category): void {
    const dialogRef = this.dialog.open(ModalSelectWalletComponent, {
      data: {
        title: 'Select wallet',
        type: 'Select wallet where money comes from',
        wallets: this.wallets
      },
      panelClass: ['primary-modal', 'modal-md'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .pipe(filter((wallet) => wallet))
      .subscribe((wallet) => this.enterExpense(wallet, category));

    this.subscriptions.push(dialogRefSub);
  }

  enterExpense(wallet: Wallet, category: Category): void {

    this.updateExpenses(wallet, category, 0);
  }

  updateExpenses(wallet: Wallet, category: Category, expense: number): void {
    console.log(wallet, 'wallet');
    console.log(category, 'category');
    console.log(expense, 'expense');

    // [category._id, 'edit']
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
