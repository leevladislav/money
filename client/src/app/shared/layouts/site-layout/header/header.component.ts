import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {WalletsService} from '../../../services/wallets.service';
import {Category} from '../../../interfaces';
import {CategoriesService} from '../../../services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalAddIncomeComponent} from '../../../../entry-components/modal-add-income/modal-add-income.component';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {unsubscribe} from '../../../../utils/unsubscriber';
import {Wallet} from '../../../interfaces/wallets.interfaces';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private media: MediaMatcher,
    private walletsService: WalletsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const categoriesUpdateSub = this.categoriesService.onUpdateCategories$
      .pipe(filter((trigger) => trigger))
      .subscribe(() => this.getExpenses());

    this.subscriptions.push(categoriesUpdateSub);

    this.getWallets();
    this.getExpenses();
    this.mobileWidthListener();
  }

  getWallets(): void {
    const walletsSub = this.walletsService.wallets$
      .subscribe((wallets: Wallet[]) => {
        this.wallets = [...wallets || []];
        this.countBalance();
      });

    this.subscriptions.push(walletsSub);
  }

  countBalance(): void {
    this.balance = this.wallets.reduce((total, item) => total += item.budget, 0);
  }

  getExpenses(): void {
    const categoriesSub = this.categoriesService.fetch()
      .subscribe((categories: Category[]) => {
        if (categories.length) {
          this.countExpenses(categories);
        }
      });

    this.subscriptions.push(categoriesSub);
  }

  countExpenses(categories): void {
    // TODO: get real data
    this.expenses = 0;
    // this.expenses = categories.reduce((total, item) => total += item.budget, 0);
  }

  mobileWidthListener(): void {
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

  toggleSidebar(event): void {
    this.onToggleSidebar.emit(event);
  }

  addIncome(): void {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    unsubscribe(this.subscriptions);
  }
}
