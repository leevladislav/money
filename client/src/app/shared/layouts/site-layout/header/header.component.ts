import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {WalletsService} from '../../../services/wallets.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Category, Wallet} from '../../../interfaces';
import {CategoriesService} from '../../../services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddIncomeComponent} from '../../../../entry-components/modal-add-income/modal-add-income.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onToggleSidebar = new EventEmitter<boolean>();
  @Input() isOpenedSidebar: boolean;
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  balance = 0;
  expenses = 0;
  wallets: Wallet[];

  constructor(
    private media: MediaMatcher,
    private walletsService: WalletsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.walletsService.onUpdateWallets$
      .pipe(untilDestroyed(this))
      .subscribe(trigger => {
        if (trigger) {
          this.getWallets();
        }
      });

    this.categoriesService.onUpdateCategories$
      .pipe(untilDestroyed(this))
      .subscribe(trigger => {
        if (trigger) {
          this.getExpenses();
        }
      });

    this.getWallets();
    this.getExpenses();
    this.mobileWidthListener();
  }

  getWallets() {
    this.walletsService.fetch()
      .pipe(untilDestroyed(this))
      .subscribe((wallets: Wallet[]) => {
        if (wallets.length) {
          this.wallets = [...wallets];
          this.countBalance(wallets);
        }
      });
  }

  countBalance(wallets) {
    this.balance = wallets.reduce((total, item) => total += item.budget, 0);
  }

  getExpenses() {
    this.categoriesService.fetch()
      .pipe(untilDestroyed(this))
      .subscribe((categories: Category[]) => {
        if (categories.length) {
          this.countExpenses(categories);
        }
      });
  }

  countExpenses(categories) {
    // TODO: get real data
    this.expenses = 0;
    // this.expenses = categories.reduce((total, item) => total += item.budget, 0);
  }

  mobileWidthListener() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => {
      if (this.mobileQuery.matches && this.isOpenedSidebar) {
        this.toggleSidebar(this.isOpenedSidebar = !this.isOpenedSidebar);
      }

      if (!this.mobileQuery.matches && !this.isOpenedSidebar) {
        this.toggleSidebar(this.isOpenedSidebar = !this.isOpenedSidebar);
      }
    };

    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  toggleSidebar(event) {
    this.onToggleSidebar.emit(event);
  }

  addIncome() {
    this.dialog.open(ModalAddIncomeComponent, {
      data: {
        title: 'Adding income',
        type: 'Select account where money comes to',
        wallets: this.wallets
      },
      panelClass: ['primary-modal', 'modal-md'],
      autoFocus: false
    });
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
