import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category, Wallet} from '../../shared/interfaces';
import {CategoriesService} from '../../shared/services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalSelectWalletComponent} from '../../entry-components/modal-select-wallet/modal-select-wallet.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  categories$: Observable<Category[]>;
  wallets: Wallet[];

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

  selectWallet(category) {
    console.log(category);

    this.dialog.open(ModalSelectWalletComponent, {
      data: {
        title: 'Select wallet',
        type: 'Select wallet where money comes from',
        wallets: this.wallets
      },
      panelClass: ['primary-modal', 'modal-md'],
      autoFocus: false
    });
  }

  updateExpenses(category) {
    console.log(category);
  }

  // [category._id, 'edit']
}
