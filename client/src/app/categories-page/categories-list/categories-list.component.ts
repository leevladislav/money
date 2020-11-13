import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoriesService} from '../../shared/services/categories.service';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category} from '../../shared/interfaces/categories.interfaces';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
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
