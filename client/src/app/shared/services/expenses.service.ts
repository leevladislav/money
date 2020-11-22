import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Message} from '../interfaces';
import {Expense, ExpenseApiWithWallets} from '../interfaces/expenses.interfaces';

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

  getByCategoryId(categoryId: string): Observable<ExpenseApiWithWallets> {
    return this.http.get<ExpenseApiWithWallets>(`/api/expense/${categoryId}`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>('/api/expense', expense);
  }

  delete(expenseId: string): Observable<Message> {
    return this.http.delete<Message>(`/api/expense/${expenseId}`);
  }

  throwExpenses(expenses: Expense[]) {
    console.log(expenses);
    this.expenses$.next(expenses);
  }
}
