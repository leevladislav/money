import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Category} from '../../../shared/interfaces/categories.interfaces';
import {CategoriesService} from '../../../shared/services/categories.service';
import {unsubscribe} from '../../../utils/unsubscriber';
import {ExpensesService} from '../../../shared/services/expenses.service';
import {Expense, ExpenseApiWithWallets, ExpenseHistoryFilter} from '../../../shared/interfaces/expenses.interfaces';
import {OpenModalInfoService} from '../../../shared/services/open-modal-info.service';
import {WalletsService} from '../../../shared/services/wallets.service';
import {RelationOfWallets} from '../../../shared/interfaces/wallets.interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  category: Category;
  expenses: Expense[] = [];
  wallets: RelationOfWallets = {};
  categoryId: string | null = null;
  params: ExpenseHistoryFilter = {
    start: moment().add(-1, 'month').toDate(),
    end: moment().endOf('day').toDate()
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private expensesService: ExpensesService,
    private openModalService: OpenModalInfoService,
    private walletsService: WalletsService
  ) {
  }

  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params.id;

        this.getCategory();
        this.getExpensesByCategoryId();
      }
    );

    this.subscriptions.push(routeSub);
  }

  getCategory(): void {
    const getCategorySub = this.categoriesService.getById(this.categoryId)
      .subscribe(
        (category: Category) => this.category = category,
        () => this.router.navigate(['history'])
      );

    this.subscriptions.push(getCategorySub);
  }

  getExpensesByCategoryId(): void {
    const getExpensesSub = this.expensesService.getByCategoryId(this.categoryId, this.params)
      .subscribe(
        (response: ExpenseApiWithWallets) => {
          this.expenses = [...response.expenses];
          this.wallets = {...response.wallets};
        },
        () => this.router.navigate(['history'])
      );

    this.subscriptions.push(getExpensesSub);
  }

  deleteExpense(expenseId: string): void {
    const deleteExpensesSub = this.expensesService.delete(expenseId)
      .subscribe(
        () => {
          this.getExpensesByCategoryId();
          this.expensesService.expensesUpdated$.next(true);
          this.walletsService.walletsUpdated$.next(true);
        },
        error => this.openModalService.openModal(null, error.error.message)
      );

    this.subscriptions.push(deleteExpensesSub);
  }

  changeExpense(expenseId: string): void {
    // TODO: open modal and change
  }

  onFilterHistory(filter: ExpenseHistoryFilter): void {
    this.params = {...filter};

    this.getExpensesByCategoryId();
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
