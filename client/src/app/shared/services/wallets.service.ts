import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Message, Wallet} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('/api/wallets');
  }

  getById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`/api/wallets/${id}`);
  }

  create(name: string, budget: number, image?: File): Observable<Wallet> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('name', name);
    formData.append('budget', budget.toString());

    return this.http.post<Wallet>('/api/wallets', formData);
  }

  update(id: string, name: string, budget: number, image?: File): Observable<Wallet> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('name', name);
    formData.append('budget', budget.toString());

    return this.http.patch<Wallet>(`/api/category/${id}`, formData);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }
}
