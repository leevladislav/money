import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../../shared/interfaces';
import {CategoriesService} from '../../../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetch();
  }
}
