import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/interfaces/categories.interfaces';
import {Subscription} from 'rxjs';
import {CategoriesService} from '../../shared/services/categories.service';
import {unsubscribe} from '../../utils/unsubscriber';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private categoriesService: CategoriesService) {
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
