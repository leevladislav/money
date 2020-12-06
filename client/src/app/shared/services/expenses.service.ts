import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Message} from '../interfaces';
import {Expense, ExpenseApiWithWallets, ExpenseHistoryFilter} from '../interfaces/expenses.interfaces';
import {getObjectUrlParams} from '../../utils/filter-converter';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expensesUpdated$ = new Subject<boolean>();
  expenses$ = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Expense[]> {
    return this.http.get<Expense[]>('/api/expense');
  }

  getByCategoryId(categoryId: string, filter: ExpenseHistoryFilter): Observable<ExpenseApiWithWallets> {
    const params = getObjectUrlParams(filter);

    return this.http.get<ExpenseApiWithWallets>(`/api/expense/${categoryId}`, {params});
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>('/api/expense', expense);
  }

  delete(expenseId: string): Observable<Message> {
    return this.http.delete<Message>(`/api/expense/${expenseId}`);
  }

  throwExpenses(expenses: Expense[]) {
    this.expenses$.next(expenses);
  }
}
