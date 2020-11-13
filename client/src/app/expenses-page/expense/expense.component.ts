import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/interfaces';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  @Input() category: Category;

  ngOnInit() {
  }
}
