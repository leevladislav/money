import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category, CategoryCreateParams, CategoryUpdateParams} from '../interfaces/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
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
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image, data.image.name);
    }

    formData.append('name', data.name);

    return this.http.post<Category>('/api/category', formData);
  }

  update(data: CategoryUpdateParams): Observable<Category> {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image, data.image.name);
    }

    formData.append('name', data.name);

    return this.http.patch<Category>(`/api/category/${data.id}`, formData);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }

  throwCategories(categories: Category[]) {
    this.categories$.next(categories);
  }
}
