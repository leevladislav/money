import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Moment} from 'moment';
import {debounceTime, filter} from 'rxjs/operators';
import {unsubscribe} from '../../utils/unsubscriber';
import {Subscription} from 'rxjs';
import {ExpenseHistoryFilter} from '../../shared/interfaces/expenses.interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy {
  @Output() onFilter = new EventEmitter<ExpenseHistoryFilter>();
  historyFilterForm: FormGroup;
  maxDateEnd: Moment = moment();

  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeForm();
  }

  initForm(): void {
    this.historyFilterForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]]
    });
  }

  subscribeForm(): void {
    const filterSub = this.historyFilterForm.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => value.start && value.end)
      )
      .subscribe((value: ExpenseHistoryFilter) => this.onFilter.emit({
        start: moment(value.start).startOf('day').toDate(),
        end: moment(value.end).endOf('day').toDate()
      }));

    this.subscriptions.push(filterSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
