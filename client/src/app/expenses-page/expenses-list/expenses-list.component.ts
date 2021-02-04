import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {CategoriesService} from '../../shared/services/categories.service';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category} from '../../shared/interfaces/categories.interfaces';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    const categoriesSub = this.categoriesService.categories$
      .subscribe((categories: Category[]) => this.categories = [...categories || []]);

    this.subscriptions.push(categoriesSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
