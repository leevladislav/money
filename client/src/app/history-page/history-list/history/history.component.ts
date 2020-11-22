import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {Category} from '../../../shared/interfaces/categories.interfaces';
import {CategoriesService} from '../../../shared/services/categories.service';
import {unsubscribe} from '../../../utils/unsubscriber';
import {ExpensesService} from '../../../shared/services/expenses.service';
import {Expense} from '../../../shared/interfaces/expenses.interfaces';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  category: Category;
  expenses: Expense[];

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private expensesService: ExpensesService
  ) {
  }

  ngOnInit() {
    const routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.getCategory(params.id);
        this.getExpensesByCategoryId(params.id);
      }
    );

    this.subscriptions.push(routeSub);
  }

  getCategory(categoryId: string): void {
    const getCategorySub = this.categoriesService.getById(categoryId).subscribe(
      (category: Category) => {
        console.log(category);
        this.category = category;
      },
      () => this.router.navigate(['history'])
    );

    this.subscriptions.push(getCategorySub);
  }

  getExpensesByCategoryId(categoryId: string): void {
    const getExpensesSub = this.expensesService.getByCategoryId(categoryId).subscribe(
      (expenses: Expense[]) => {
        console.log('expenses', expenses);
        this.expenses = [...expenses];
      },
      () => this.router.navigate(['history'])
    );

    this.subscriptions.push(getExpensesSub);
  }

  onDeleteExpense(expenseId): void {
    // TODO: remove expense by expenseId
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
