import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../interfaces';
import {Expense} from '../interfaces/expenses.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenses$ = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Expense[]> {
    return this.http.get<Expense[]>('/api/expense');
  }

  getByCategoryId(categoryId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`/api/expense/${categoryId}`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>('/api/expense', expense);
  }

  delete(expense: Expense): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${expense._id}`);
  }

  throwExpenses(expenses: Expense[]) {
    this.expenses$.next(expenses);
  }
}
