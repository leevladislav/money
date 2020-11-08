import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/interfaces';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }

  selectWallet(category) {
    console.log(category);
  }

  updateExpenses(category) {
    console.log(category);
  }

  // [category._id, 'edit']
}
