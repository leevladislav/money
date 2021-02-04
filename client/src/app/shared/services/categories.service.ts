import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Message} from '../interfaces';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Category, CategoryCreateParams, CategoryUpdateParams} from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categoriesUpdated$ = new Subject<boolean>();
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  create(data: CategoryCreateParams): Observable<Category> {
    return this.http.post<Category>('/api/category', data);
  }

  update(data: CategoryUpdateParams): Observable<Category> {
    return this.http.patch<Category>(`/api/category/${data.id}`, data);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }

  throwCategories(categories: Category[]): void {
    this.categories$.next(categories);
  }
}
